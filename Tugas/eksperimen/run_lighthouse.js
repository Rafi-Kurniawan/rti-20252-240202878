const fs = require('fs');
const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const yaml = require('yaml');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Baca konfigurasi dari experiment.yaml
const file = fs.readFileSync('./experiment.yaml', 'utf8');
const config = yaml.parse(file);

const resultsDir = './results';
if (!fs.existsSync(resultsDir)){
    fs.mkdirSync(resultsDir);
}

const csvWriter = createCsvWriter({
    path: `${resultsDir}/summary.csv`,
    header: [
        {id: 'framework', title: 'Framework'},
        {id: 'viewport', title: 'Viewport'},
        {id: 'run_id', title: 'Run_ID'},
        {id: 'fcp', title: 'FCP_ms'},
        {id: 'lcp', title: 'LCP_ms'},
        {id: 'score', title: 'Performance_Score'}
    ]
});

async function runLighthouse(url, viewport, run_id, framework) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'error',
        output: 'json',
        onlyCategories: ['performance'],
        port: chrome.port,
    };
    
    // Konfigurasi simulasi untuk Lighthouse
    const lhConfig = {
        extends: 'lighthouse:default',
        settings: {
            formFactor: viewport.mobile ? 'mobile' : 'desktop',
            screenEmulation: {
                mobile: viewport.mobile,
                width: viewport.width,
                height: viewport.height,
                deviceScaleFactor: viewport.deviceScaleFactor,
                disabled: false,
            },
            throttlingMethod: 'simulate',
            throttling: {
                rttMs: config.settings.throttle.rttMs,
                throughputKbps: config.settings.throttle.throughputKbps,
                cpuSlowdownMultiplier: config.settings.throttle.cpuSlowdownMultiplier,
                requestLatencyMs: config.settings.throttle.rttMs,
                downloadThroughputKbps: config.settings.throttle.throughputKbps,
                uploadThroughputKbps: config.settings.throttle.throughputKbps,
            }
        }
    };

    console.log(`[Run ${run_id}/10] Testing ${framework} on ${viewport.name}...`);
    const runnerResult = await lighthouse(url, options, lhConfig);
    try {
        await chrome.kill();
    } catch (e) {
        // Ignore EPERM errors from chrome-launcher failing to delete temp profiles on Windows
    }

    const audits = runnerResult.lhr.audits;
    const fcp = audits['first-contentful-paint'].numericValue;
    const lcp = audits['largest-contentful-paint'].numericValue;
    const score = runnerResult.lhr.categories.performance.score * 100;

    return {
        framework: framework,
        viewport: viewport.name,
        run_id: run_id,
        fcp: fcp.toFixed(2),
        lcp: lcp.toFixed(2),
        score: score.toFixed(0)
    };
}

async function startExperiment() {
    console.log('Memulai eksperimen performa web...');
    let allRecords = [];

    for (const viewport of config.viewports) {
        for (const framework of config.frameworks) {
            for (let i = 1; i <= config.settings.iterations; i++) {
                try {
                    const result = await runLighthouse(framework.url, viewport, i, framework.name);
                    allRecords.push(result);
                    // Jeda sebentar untuk garbage collection
                    await new Promise(r => setTimeout(r, 1000));
                } catch (error) {
                    console.error(`Error pada ${framework.name} - ${viewport.name} (run ${i}):`, error.message);
                }
            }
        }
    }

    console.log('Eksperimen selesai. Menyimpan data...');
    await csvWriter.writeRecords(allRecords);
    console.log(`Hasil disimpan di ${resultsDir}/summary.csv`);
}

startExperiment();
