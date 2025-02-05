export default function isBuildtime() {
    return process.env.NEXT_PHASE === 'phase-production-build';
}
