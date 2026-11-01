export const resumeProjects = [
    {
        id: "api-suite",
        title: "API Test Automation Suite (RestAssured & Postman/Newman)",
        link: "https://github.com/shubhamkr83/RestAssured_Automation",
        bullets: [
            "Engineered a REST API automation framework with 471 automated tests across two production APIs, BOMB (212) and the Navo Buyer App (259), using RestAssured, TestNG and Maven, alongside Postman/Newman collections",
            "Implemented complete CI/CD pipeline with Jenkins automation, AWS S3 timestamped reports, Python-based result parsing, intelligent 3-attempt retry mechanism, and multi-channel notifications (email/Google Chat)",
            "Designed production-safe tests for 8 new backend route groups that send only reads or requests rejected before any write, with every test linked to its QA test case via Allure TMS links and key responses checked against JSON Schemas",
            "Hardened the framework: credentials moved from source to Jenkins credentials and env vars, expiring hardcoded test data replaced by live run-time lookups, and suites made self-discovering, reaching a 100% pass rate (471/471) on the latest full run",
        ],
        projectIds: [1, 3],
    },
    {
        id: "master-qa-prompts",
        title: "Master QA Prompts: AI-Generated QA Documentation (Frontend & Backend)",
        link: "https://github.com/Bizup-world/backend-api",
        bullets: [
            "Wrote two reusable master prompts (backend API and web frontend) that an AI coding agent runs against a codebase to generate its complete QA system: a 9-section QA context, exhaustive test cases, smoke and environment docs, coverage checks and an HTML QA dashboard",
            "Enforced a strict step order (pre-scan, QA context, Bruno API collection, then test cases) so every Expected Result is derived from an existing API assertion rather than an invented response shape",
            "Applied across 4 production repositories (2 backends, 2 frontends), generating 3,850+ test cases and a 1,159-request Bruno collection, kept current by an on-demand /update-qa-context skill and a qa:check coverage gate",
        ],
        projectIds: [8],
    },
    {
        id: "android-automation",
        title: "Android Automation Framework",
        link: "https://github.com/shubhamkr83/android-automation",
        bullets: [
            "Built scalable Android UI automation framework using Java, Appium 10.0.0, and TestNG for Bizup Buyer App testing across 3 versions (2.16.4, 3.0.1, 3.0.4)",
            "Implemented Page Object Model architecture with versioned test suites (Smoke/Regression), BrowserStack cloud integration, and centralized driver management for parallel execution",
            "Integrated ExtentReports 5.1.2 with screenshot capture on failures, automated email notifications with HTML summaries, RetryAnalyzer for flaky tests, and Log4j2 logging",
        ],
        projectIds: [2],
    },
    {
        id: "android-cicd",
        title: "Android APK/AAB Build & Release CI/CD Pipeline",
        link: "https://github.com/Bizup-world/android",
        bullets: [
            "Architected production-ready Jenkins pipeline for automated Android builds with parameterized branch selection (develop/main/feature) and multi-artifact generation (Debug APK, Release APK, AAB)",
            "Implemented secure code signing using Jenkins credential store, SHA256 checksum generation for integrity verification, and automated AWS S3 uploads with organized folder structure",
            "Integrated environment verification (Java 17, Android SDK, Gradle), build artifact tracking with s3_links.txt, automatic archiving/fingerprinting, and failure diagnostics with dependency reports",
        ],
        projectIds: [4],
    },
    {
        id: "health-monitoring",
        title: "Website Health Monitoring & Alerting System",
        link: "https://github.com/shubhamkr83",
        bullets: [
            "Developed production-grade health monitoring system for bizup.app and navofashion.in with automated HTTP checks, SSL certificate validation, and response time tracking via Jenkins",
            "Engineered multi-channel alerting system using Google Chat webhooks, Twilio API for WhatsApp messages and voice calls, triggering instant notifications on failure detection",
            "Implemented geo-location tracking (IP-API integration), comprehensive reporting with server info/SSL status, AWS S3 archiving for historical analysis, and Jenkins build tracking",
        ],
        projectIds: [5, 6],
    },
    {
        id: "payment-health",
        title: "Payment Gateway Health Check Automation",
        link: "https://github.com/shubhamkr83",
        bullets: [
            "Created critical payment API monitoring automation using Postman/Newman with intelligent 3-attempt retry logic (20s delays) and failure-only Google Chat alerts",
            "Built branch-specific S3 report organization (main/dev/feature), automated JSON/HTML report generation with 30-min freshness validation and size-based verification",
            "Delivered comprehensive test analysis with request/assertion success rates, detailed failure summaries (up to 10 failed tests with HTTP codes), and multi-environment workflow support",
        ],
        projectIds: [7],
    },
];
