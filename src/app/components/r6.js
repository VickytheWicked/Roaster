import R6 from 'r6s-stats-api'


let platform = 'mobile';
let name = 'agent-vr';

async function main() {
    let general = await R6.general(platform, name);
    console.log('general', general);
}
main();