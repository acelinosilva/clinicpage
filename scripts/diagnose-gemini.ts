import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('Error: GEMINI_API_KEY is not defined in the environment.');
    process.exit(1);
}

async function listModels(version: string) {
    console.log(`\n--- Checking API Version: ${version} ---`);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`);
        if (!response.ok) {
            console.error(`Status ${response.status}: ${await response.text()}`);
            return;
        }
        const data = await response.json();
        console.log(`Available Models for ${version}:`);
        data.models.forEach((m: any) => console.log(` - ${m.name} (${m.displayName})`));
    } catch (error: any) {
        console.error(`Error fetching ${version}:`, error.message);
    }
}

async function run() {
    await listModels('v1');
    await listModels('v1beta');
}

run();
