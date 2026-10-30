// Plain JS (no JSX, no React imports) so it also runs under plain `node`.

// First match wins, so the order matters: "Build & Upload APK" is a build,
// "Report Upload to S3" is an upload, "Google Chat Notification" is a bell.
const RULES = [
    [/checkout|clone|\bgit\b/i, "git"],
    [/\bsign/i, "sign"],
    [/build|compile|gradle/i, "build"],
    [/upload|\bs3\b/i, "upload"],
    [/whatsapp/i, "chat"],
    [/voice|\bcall/i, "phone"],
    [/notif|alert/i, "bell"],
    [/chat/i, "chat"],
    [/mail/i, "mail"],
    [/report|allure|summary|logging/i, "report"],
    [/retry/i, "retry"],
    [/test|newman|postman/i, "play"],
    [/health|website|http/i, "globe"],
    [/variable|credential|secret|jwt|auth|token|keystore/i, "key"],
    [/\bai\b/i, "ai"],
    [/ssl|secur|checksum|sha256/i, "shield"],
    [/performance|response time|threshold/i, "clock"],
    [/environment|setup|\bnode\b/i, "server"],
    [/archive|artifact/i, "archive"],
    [/publish|deploy|cloud|browserstack/i, "cloud"],
    [/data|pojo|mongo|schema/i, "db"],
    [/device|android|version/i, "device"],
    [/search|discover|geo/i, "search"],
    [/branch/i, "branch"],
    [/page object|architecture|code/i, "code"],
];

/** Guess an icon key (see icons.js) from free text; "check" when nothing matches. */
export const guessIcon = (text = "") => {
    const rule = RULES.find(([re]) => re.test(text));
    return rule ? rule[1] : "check";
};

/** Convert project.pipelineFlow.stages into a FlowDiagram flow, or null when there is none. */
const toPipelineFlow = (project) => {
    const stages = project?.pipelineFlow?.stages;
    if (!Array.isArray(stages) || stages.length === 0) return null;
    return {
        title: "CI/CD pipeline",
        kind: "pipeline",
        steps: stages.map((label) => ({ label, icon: guessIcon(label), detail: "" })),
    };
};

export default toPipelineFlow;
