const ProjectData = [
    {
        id: 1,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        images: [
            "https://drive.google.com/file/d/1dMlLwspoNKrMonwDRzzGZtjV3vIdwesw/preview"
            // "https://drive.google.com/file/d/11OW5mPx2ryRtr1PGWqvX94-1zSBgn4PD/view",
            // "https://drive.google.com/file/d/1sfztEotOFLsUqoH2LGpEw8YlAavpjUw3/view",
        ],
        name: "API Automation Framework (RestAssured)",
        git: "https://github.com/shubhamkr83/RestAssured_Automation",
        live: "https://github.com/shubhamkr83/RestAssured_Automation",
        category: "Automation Testing",
        overview: "A REST API automation framework for two production APIs: BOMB (admin/seller operations at api.bizup.app) and the Navo Buyer App (consumer API at api.navofashion.in). Built in Java with RestAssured, TestNG and Allure, it runs 471 tests across 63 test classes and 60+ endpoints, with the latest full run passing 471/471. Because it runs against production, the newest tests only send reads or requests the API rejects before any write, and every test links back to its documented QA test case. Credentials come from CI secrets, test data is looked up live at run time, and Jenkins publishes Allure reports to AWS S3 with email and Google Chat alerts.",
        features: [
            "471 tests across two production APIs: BOMB (212 tests, 4 workflow pipelines) and Buyer App (259 tests)",
            "Production-safe test design: 76 tests for new API routes send only GETs or requests rejected before any write, Kafka publish or LLM call",
            "Test-case traceability: every test carries an Allure @TmsLink to its QA test case in the backend repo",
            "Contract testing: JSON Schema validation of key responses catches renamed, removed or retyped fields",
            "Self-healing test data: cart and catalog ids are resolved from live APIs at run time instead of hardcoded ids that expire",
            "Secrets out of git: logins come from Jenkins credentials or env vars, and tokens stay in memory, never written to disk",
            "Shared request specs send the real app's headers (zone, app version, segment) with on-demand login, so any class runs on its own",
            "Group-based TestNG suites pick up new test classes automatically; README test counts are generated from source",
            "CI/CD: Jenkins pipeline, timestamped Allure reports on AWS S3, Python result parsing, email and Google Chat notifications",
            "Workflow pipelines: Login → Catalog Search → Catalog Tagging → Video Upload and Tagging, sharing data via VariableManager"
        ],
        structure: "One framework serves both APIs. BaseTest builds the RestAssured specs (including a shared Buyer App spec with the app's headers and on-demand login); ConfigManager uses Owner to merge -D properties, CI env vars, a gitignored secrets file and config.properties; TestDataResolver looks up live ids with read-only GETs; ApiErrorAssertions checks the backend's error envelope. Endpoints live in BombEndpoints and BuyerAppEndpoints, payloads in Jackson/Lombok POJOs, and JSON Schemas under test resources. The Buyer App suite is discovered by package and TestNG group; BOMB keeps an ordered class list because its pipelines pass data between steps. Jenkins injects credentials, runs Maven, builds Allure, uploads to S3 and sends notifications.",
        testing: {
            testTypes: ["API Tests", "Contract (JSON Schema) Tests", "Negative / Security Tests", "Workflow Pipeline Tests"],
            apiTargets: ["BOMB API (212 tests)", "Buyer App API (259 tests)"],
            profiles: ["All", "BOMB-Pipeline", "BuyerApp-Pipeline"]
        },
        pipelineFlow: {
            stages: ["Checkout", "Inject Credentials", "Run Tests", "Setup Allure", "Generate Report", "Upload to S3", "Extract Summary", "Send Notifications", "Archive Links"],
            postBuild: ["Always", "Failure", "Success", "Unstable"]
        },
        highlights: [
            { value: "471", label: "Automated tests" },
            { value: "60+", label: "Endpoints" },
            { value: "100%", label: "Latest full-run pass rate" },
            { value: "2", label: "Production APIs" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Load secrets", icon: "key", detail: "Login credentials come from Jenkins credentials or env vars; the JWT from login stays in memory for the run." },
                    { label: "Resolve data", icon: "code", detail: "Current cart and catalog ids are looked up from live APIs with read-only GETs." },
                    { label: "Run TestNG suite", icon: "play", detail: "BOMB pipelines run in order; Buyer App tests are discovered by package and group." },
                    { label: "Assert & validate", icon: "check", detail: "Status codes, error envelopes, field values, JSON Schemas and response-time thresholds are checked." },
                    { label: "Allure report", icon: "report", detail: "Allure dashboards link every test to its QA test case." },
                    { label: "Upload to S3", icon: "upload", detail: "Timestamped report folders are uploaded to AWS S3 by the Jenkins pipeline." },
                    { label: "Notify team", icon: "chat", detail: "Email and Google Chat alerts summarize results for the team." },
                ],
            },
        ],
        tools: ["Java 17", "Maven", "RestAssured 5.4", "TestNG 7.9", "Allure 2.25", "JSON Schema Validator", "Jenkins", "AWS S3", "Python 3", "Jackson 2.16", "Lombok 1.18", "Log4j2 2.22", "Hamcrest 2.2", "Owner 1.0.12", "Google Chat Webhooks", "SMTP Email"]
    },
    {
        id: 8,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/markdown/markdown-original.svg",
        images: [],
        dashboardDemo: true,
        name: "Master QA Prompts: AI-Generated QA Documentation (Frontend & Backend)",
        git: "https://github.com/Bizup-world/backend-api",
        live: "https://github.com/Bizup-world/backend-api",
        category: "AI-Assisted QA",
        overview: "Two reusable prompts that an AI coding agent (Claude Code or Cursor, in Agent mode) runs once against a codebase to build its whole QA documentation system. master_backend_qa_prompt.md targets backend APIs; master_frontend_qa_prompt.md targets web frontends and SPAs. The agent scans the code, then writes everything in a fixed order: a 9-section QA context document, an API collection (backend only), exhaustive test cases, smoke and environment docs, coverage-check scripts, an HTML QA dashboard, and an /update-qa-context skill that keeps it all current. Applied to four Navo / Bizup repositories, it produced about 3,850 test cases in 450 feature files and a Bruno collection of 1,159 requests.",
        features: [
            "Pre-scan: before writing anything, the agent discovers the framework, router or route registration, auth scheme, ORM, validation library, response envelope, state management and background jobs, and reuses those findings in every step",
            "Strict step order: QA_CONTEXT first, then (backend) the full Bruno API collection, and only then test cases, so every Expected Result mirrors an assertion that already exists instead of an invented response shape",
            "QA_CONTEXT.md in 9 sections: route groups or screens, auth and user flows, endpoints or API calls, data models or state shapes, enums, validation, error handling, per-feature details, and background jobs or client infrastructure",
            "Exhaustive test cases: positive, negative (each required field missing, each unauthorized role, expired token) and edge cases (boundaries, races, invalid status transitions, flag-gated behaviour), with Priority, Smoke/Regression type, Automatable and Auth on every case",
            "Bruno API collection (backend): one .bru file per endpoint with a mandatory tests block, plus negative files for every endpoint",
            "Coverage drift check: qa-utils.mjs parses the project's real routes and qa:check exits 1 when a route has no test case, is missing from QA_CONTEXT, or is stale",
            "Self-contained HTML QA dashboard: 6 tabs for backend, 5 for frontend, with stats, a filterable test-case table with CSV export, smoke checklist with pass/fail state, feature cards, coverage gaps and the last Bruno run",
            "Kept current on demand: the generated /update-qa-context skill re-scans the whole project and updates only the affected sections and test files, never deleting old cases (it marks them deprecated)",
            "Generic by design: framework, auth header, folder names, domain prefixes and package manager are discovered, not hardcoded, so the same prompt runs on Express, NestJS, FastAPI, Next.js, Vite + React and more",
            "Frontend variant: test steps use UI actions (click, fill, see, be redirected), and it adds empty, loading and error states, deep links, back-button and session-expiry cases, accessibility spot-checks and a browser/device matrix"
        ],
        structure: "Each prompt is one Markdown file copied to the repository root and pasted into an agent session. It opens with a pre-scan checklist, then an execution-order table, then one section per step that specifies the exact output file, its headings and its rules, and ends with a confirmation checklist the agent must satisfy. The backend prompt (about 950 lines) has 6 main steps plus optional extensions for worker test cases and a test-data seed script. The frontend prompt (about 750 lines) has 5 steps and ends with a table of how it differs from the backend version. The generated output is shared: QA/docs/ (QA_CONTEXT, SMOKE_TESTS, TEST_ENV), QA/test_cases_doc/<domain>/<feature>/test_cases.md, QA/qa-utils.mjs, QA/check-coverage.mjs, QA/generate-dashboard.mjs and the agent skills. The test cases also feed the RestAssured framework, where each automated test links back to its case through an Allure TMS link.",
        testing: {
            testTypes: ["Positive", "Negative", "Edge Case", "Smoke", "Regression", "RBAC spot-checks", "Accessibility spot-checks"],
            apiTargets: ["backend-api (1,076 TCs, 1,159 Bruno requests)", "worms OMS backend (1,356 TCs)", "OMS frontend (416 TCs)", "BOMB admin frontend (1,008 TCs)"],
            profiles: ["qa:check", "qa:dashboard", "qa:run", "/update-qa-context"]
        },
        highlights: [
            { value: "2", label: "Master prompts (frontend & backend)" },
            { value: "4", label: "Repositories documented" },
            { value: "3,850+", label: "Test cases generated" },
            { value: "1,159", label: "Bruno API requests" },
        ],
        flows: [
            {
                title: "Backend prompt",
                kind: "user",
                steps: [
                    { label: "Pre-scan", icon: "search", detail: "Find the framework, route registration, auth header format, ORM, validation library, response envelope and job workers." },
                    { label: "QA_CONTEXT.md", icon: "report", detail: "Write all 9 sections: route groups, auth flows and status tables, endpoints, models, enums, validation, errors, features and background jobs." },
                    { label: "Bruno collection", icon: "code", detail: "Create one .bru request per endpoint in one pass, each with a tests block, plus negative files. Must finish before test cases start." },
                    { label: "Test cases", icon: "check", detail: "Write exhaustive positive, negative and edge cases per feature, with Expected Results copied from the Bruno assertions." },
                    { label: "Smoke & env docs", icon: "shield", detail: "SMOKE_TESTS.md lists the business-critical checks; TEST_ENV.md lists environments, role accounts and seeding." },
                    { label: "Coverage check", icon: "server", detail: "qa-utils.mjs parses real routes; qa:check fails when a route has no test case or the context is stale." },
                    { label: "Skills & dashboard", icon: "ai", detail: "Create the update-qa-context, bruno and create-api skills, then build the 6-tab HTML QA dashboard." },
                ],
            },
            {
                title: "Frontend prompt",
                kind: "user",
                steps: [
                    { label: "Pre-scan", icon: "search", detail: "Find the framework, router type, layouts, auth guards and token storage, state management, API layer, form library and E2E setup." },
                    { label: "QA_CONTEXT.md", icon: "report", detail: "Write all 9 sections: screens, user flows and navigation, API calls, data and state shapes, enums, form validation, error/empty/loading states, features and client infrastructure." },
                    { label: "Test cases", icon: "check", detail: "Write UI-action test cases per feature, including deep links, back button, session expiry, slow and failing APIs, and theme or locale changes." },
                    { label: "Smoke & env docs", icon: "shield", detail: "Smoke checklist with RBAC and accessibility spot-checks; TEST_ENV with the browser and device matrix." },
                    { label: "Coverage check", icon: "server", detail: "extractAppRoutes() parses the router or pages folder; qa:check lists pages without test cases." },
                    { label: "Skill & dashboard", icon: "ai", detail: "Create the /update-qa-context skill and an editor rule, then build the 5-tab HTML QA dashboard." },
                ],
            },
            {
                title: "Keeping it current",
                kind: "user",
                steps: [
                    { label: "Ship a feature", icon: "git", detail: "Ordinary feature work never rewrites QA docs automatically." },
                    { label: "/update-qa-context", icon: "ai", detail: "On request, the agent re-scans the whole project and updates only the affected QA_CONTEXT sections and test files." },
                    { label: "qa:check", icon: "check", detail: "The coverage check confirms no route or page is left without test cases." },
                    { label: "Automate", icon: "play", detail: "Cases marked Automatable become RestAssured tests that link back to their test-case ID in Allure." },
                ],
            },
        ],
        tools: ["Claude Code", "Cursor", "Markdown", "Node.js (.mjs scripts)", "Bruno", "HTML / vanilla JS dashboard", "Agent skills", "Express / TypeScript", "Next.js", "React + Vite", "RestAssured + Allure"]
    },
    {
        id: 2,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg",
        images: [
            "https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png",
            "https://testng.org/images/testng.png",
            "https://maven.apache.org/images/maven-logo-black-on-white.png",
            "https://www.browserstack.com/images/layout/browserstack-logo-600x315.png",
        ],
        name: "Bizup Buyer App - Android Automation Framework",
        git: "https://github.com/shubhamkr83/android-automation",
        live: "https://github.com/shubhamkr83/android-automation",
        category: "Automation Testing",
        overview: "Enterprise-grade Android UI automation framework for Bizup Buyer App - a zero-commission B2B video shopping platform for the fashion industry. This comprehensive framework tests critical user flows across multiple app versions (2.16.4, 3.0.1, 3.0.4) using Appium, TestNG, and Page Object Model architecture. Features include versioned test suites (Smoke & Regression), BrowserStack cloud integration, automated email notifications with HTML reports, and ExtentReports with screenshot capture on failures.",
        features: [
            "Multi-version support: Tests for app versions 2.16.4 (143), 3.0.1 (148), and 3.0.4 (151)",
            "Comprehensive test coverage: Login flows, search & discovery, cart & orders, seller profiles, video feeds",
            "Page Object Model architecture with clean separation of test logic and UI elements",
            "Versioned test suites organized by app version with Smoke and Regression test types",
            "Centralized driver management via single AndroidDriver instance in Base class",
            "Rich reporting with ExtentReports including screenshots on test failures",
            "BrowserStack cloud integration for testing on real devices with parallel execution",
            "Automated email notifications with HTML summary, test statistics, and BrowserStack links",
            "Retry mechanism for auto-retrying failed tests via RetryAnalyzer",
            "Structured logging with Log4j2 configuration for comprehensive debugging"
        ],
        testing: {
            testTypes: ["Smoke Tests", "Regression Tests"],
            appVersions: ["2.16.4 (143)", "3.0.1 (148)", "3.0.4 (151)"],
            testAreas: ["Login Flows", "Search & Discovery", "Cart & Orders", "Video Feeds", "Seller Profiles"],
            profiles: ["Smoke151", "Smoke148", "Smoke143", "Regression151", "Regression148", "Regression143"]
        },
        highlights: [
            { value: "3", label: "App versions" },
            { value: "2", label: "Suite types (Smoke & Regression)" },
            { value: "6", label: "Test profiles" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Pick version", icon: "device", detail: "Choose a Smoke or Regression profile for app version 2.16.4, 3.0.1, or 3.0.4." },
                    { label: "Launch BrowserStack", icon: "cloud", detail: "Tests start on real devices in BrowserStack with parallel execution." },
                    { label: "Drive the app", icon: "play", detail: "Page Object Model tests exercise login, search, cart, orders, and video feeds." },
                    { label: "Retry flaky tests", icon: "retry", detail: "RetryAnalyzer automatically re-runs failed tests before they are marked failed." },
                    { label: "Capture failures", icon: "report", detail: "ExtentReports records results with screenshots on test failures." },
                    { label: "Email summary", icon: "mail", detail: "An HTML summary with statistics and BrowserStack links is emailed automatically." },
                ],
            },
        ],
        tools: ["Java 8+", "Appium 10.0.0", "TestNG 7.11.0", "Maven", "ExtentReports 5.1.2", "Log4j2 2.24.3", "BrowserStack Java SDK 1.39.1", "JavaMail 1.6.2", "Jackson", "Commons IO", "Android SDK", "Node.js"]
    },
    {
        id: 3,
        image: "https://www.gartner.com/pi/vendorimages/postman_full-life-cycle-api-management_1633960356020.png",
        images: [
            "https://www.jenkins.io/images/logos/jenkins/jenkins.svg",
            "https://newman.postman.com/images/newman-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://developers.google.com/static/chat/images/chat-product-icon.png",
        ],
        name: "API Automation with Postman & Jenkins",
        git: "https://github.com/shubhamkr83/api-automation-postman-jenkins",
        live: "https://github.com/shubhamkr83/api-automation-postman-jenkins",
        category: "Automation Testing",
        overview: "Comprehensive API testing automation solution combining Postman collections with Jenkins CI/CD pipelines. Features intelligent retry mechanism (up to 3 attempts with 30s delay), branch-specific S3 organization, and real-time Google Chat notifications. Generates Newman JSON/HTML reports with detailed test statistics, failure analysis, and automated cloud storage. Supports multi-environment testing with production (main/master) and development (dev/develop) branch separation, automated report verification, and comprehensive error handling.",
        features: [
            "Automated Postman test execution via Newman with CLI, JSON, and HTML reporters",
            "Intelligent retry mechanism: Up to 3 attempts with 30-second delays between failures",
            "Branch-specific S3 organization: Separate folders for main, dev, and feature branches",
            "Real-time Google Chat notifications with detailed failure summaries and direct report links",
            "Comprehensive test analysis: Request/assertion success rates, failure detection, and retry tracking",
            "Timestamped report generation with strict freshness validation (30-minute threshold)",
            "Multi-environment support: Production (main/master) and development (dev/develop) workflows",
            "Automated S3 upload with size-based verification and public-read ACL for easy access",
            "Detailed failure reporting: Shows up to 10 failed tests with HTTP errors and assertion details",
            "Build status tracking: Success, failure, and retry statistics with archiving and fingerprinting"
        ],
        pipelineFlow: {
            stages: [
                "Checkout",
                "Setup Environment Variables",
                "Setup Node Environment",
                "Run Postman Tests",
                "Upload to S3",
                "Generate Report",
                "Send Notifications"
            ],
            postBuild: ["Always", "Failure", "Success"]
        },

        highlights: [
            { value: "3", label: "Retry attempts" },
            { value: "30s", label: "Retry delay" },
            { value: "30 min", label: "Report freshness check" },
            { value: "10", label: "Failed tests listed" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Pick branch", icon: "branch", detail: "Main/master use production settings; dev/develop use the development environment." },
                    { label: "Run Newman", icon: "play", detail: "Postman collections execute via Newman with CLI, JSON, and HTML reporters." },
                    { label: "Retry failures", icon: "retry", detail: "Failed runs retry up to 3 attempts with 30-second delays between them." },
                    { label: "Verify report", icon: "check", detail: "Generated reports must pass the 30-minute freshness validation." },
                    { label: "Upload to S3", icon: "upload", detail: "Reports upload to branch-specific S3 folders with size-based verification." },
                    { label: "Analyze results", icon: "report", detail: "Request and assertion success rates and failures are calculated from the report." },
                    { label: "Alert Google Chat", icon: "chat", detail: "Notifications carry failure summaries and direct report links." },
                ],
            },
        ],
        tools: ["Node.js v20.15.0", "Newman", "Postman Collections", "Jenkins", "NVM", "AWS S3", "AWS CLI", "Google Chat Webhooks", "Bash", "Groovy (Jenkins Pipeline)", "JSON/HTML Reporters"]
    },
    {
        id: 4,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg",
        images: [
            "https://gradle.org/images/gradle-knowledge-graph-logo.png",
            "https://www.jenkins.io/images/logos/jenkins/jenkins.svg",
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        ],
        name: "Android APK/AAB Build & Release CI/CD Pipeline",
        git: "https://github.com/Bizup-world/android",
        live: "https://github.com/Bizup-world/android",
        category: "DevOps & CI/CD",
        overview: "Production-ready Jenkins CI/CD pipeline for automated Android app builds and releases. Supports parameterized branch selection, builds both Debug and Release APKs plus Release AAB bundles with proper signing, generates SHA256 checksums for integrity verification, and automatically uploads all artifacts to AWS S3 with organized folder structure. Features comprehensive environment verification, secure credential management via Jenkins credentials store, and detailed build diagnostics on failures.",
        features: [
            "Parameterized builds: Select target branch (develop/main/feature) via Jenkins UI",
            "Multi-artifact generation: Debug APK, Release APK, and Release AAB in single pipeline run",
            "Automated code signing: Secure keystore management with injected signing credentials",
            "SHA256 checksum generation: Automatic integrity verification files for all artifacts",
            "AWS S3 integration: Organized uploads to bizup-builds bucket with build number folders",
            "Build artifact tracking: Generates s3_links.txt with direct download URLs for all builds",
            "Environment verification: Pre-build checks for Java 17, Android SDK, Gradle, and build tools",
            "Secure credential handling: Jenkins credential store for AWS keys, keystore, and signing passwords",
            "Automatic artifact archiving: Jenkins fingerprinting for build traceability and history",
            "Failure diagnostics: Automatic dependency and signing report generation on build failures"
        ],
        pipelineFlow: {
            stages: [
                "Checkout Code",
                "Verify Environment",
                "Build & Upload Debug APK",
                "Build & Upload Release APK",
                "Build & Upload AAB",
                "Archive Artifacts"
            ],
            postBuild: ["Always", "Failure"]
        },
        highlights: [
            { value: "3", label: "Artifacts per run" },
            { value: "SHA256", label: "Checksums" },
            { value: "3", label: "Branch types" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Choose branch", icon: "branch", detail: "Select develop, main, or a feature branch through Jenkins parameters." },
                    { label: "Verify environment", icon: "check", detail: "Pre-build checks confirm Java 17, Android SDK, Gradle, and build tools." },
                    { label: "Build & sign", icon: "sign", detail: "Debug APK, Release APK, and Release AAB are built with injected signing credentials." },
                    { label: "Checksum", icon: "shield", detail: "SHA256 checksum files are generated for integrity verification of every artifact." },
                    { label: "Upload to S3", icon: "upload", detail: "Artifacts upload to the bizup-builds bucket in build number folders." },
                    { label: "Share links", icon: "archive", detail: "s3_links.txt lists direct download URLs and artifacts are fingerprinted." },
                ],
            },
        ],
        tools: ["Jenkins", "Gradle", "Java 17", "Android SDK", "AWS S3", "AWS CLI", "Bash", "Git", "Android Build Tools 34.0.0", "Groovy (Jenkins Pipeline)"]
    },
    {
        id: 5,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://developers.google.com/static/chat/images/chat-product-icon.png",
            "https://www.twilio.com/content/dam/twilio-com/global/en/blog/legacy/2017/Twilio_Logo_Red-1.png",
            "https://curl.se/logo/curl-logo.svg",
        ],
        name: "Website Health Check & Monitoring Pipeline",
        git: "https://github.com/shubhamkr83/health-check-pipeline",
        live: "https://bizup.app",
        category: "DevOps & CI/CD",
        overview: "Production-grade automated website health monitoring system with multi-channel alerting via Jenkins CI/CD. Performs scheduled HTTP health checks on Bizup Fashion website (bizup.app), monitors SSL certificate validity, tracks response times, and gathers geo-location server data. On failure detection, triggers instant alerts through Google Chat, WhatsApp messages to multiple team members, and automated voice calls. Generates comprehensive reports with timestamp, build details, server information, and uploads to AWS S3 for historical tracking and analysis.",
        features: [
            "Automated HTTP health checks: Monitors website availability with curl-based status validation",
            "Multi-channel alerting: Google Chat, WhatsApp messages, and automated voice calls on failures",
            "SSL certificate validation: Verifies SSL status and displays certificate health in reports",
            "Response time monitoring: Tracks and reports website response times for performance analysis",
            "Geo-location tracking: Captures server IP, country, region, city, and ISP information",
            "AWS S3 report archiving: Timestamped failure reports uploaded to S3 for historical analysis",
            "Multiple recipient support: Sends alerts to team members via configured phone numbers",
            "Twilio integration: WhatsApp and voice call functionality using Twilio API",
            "Detailed failure reports: Comprehensive reports with build URL, timestamp, server info, SSL status",
            "Jenkins build tracking: Updates build descriptions and archives S3 URLs for easy access"
        ],
        pipelineFlow: {
            stages: [
                "Health Check",
                "Alert Generation",
                "Report Upload to S3",
                "Google Chat Notification",
                "WhatsApp Alerts",
                "Voice Call Alerts"
            ],
            postBuild: ["Always"]
        },
        highlights: [
            { value: "3", label: "Alert channels" },
            { value: "SSL", label: "Certificate validation" },
            { value: "bizup.app", label: "Monitored site" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Check health", icon: "globe", detail: "Scheduled curl-based HTTP checks validate website availability on bizup.app." },
                    { label: "Validate SSL", icon: "shield", detail: "SSL certificate validity and response time are checked and tracked." },
                    { label: "Locate server", icon: "search", detail: "IP-API returns server IP, country, region, city, and ISP information." },
                    { label: "Build report", icon: "report", detail: "Failure reports include build URL, timestamp, server info, and SSL status." },
                    { label: "Archive to S3", icon: "upload", detail: "Timestamped failure reports upload to AWS S3 for historical analysis." },
                    { label: "Alert team", icon: "bell", detail: "Google Chat, WhatsApp messages, and voice calls fire on failure." },
                ],
            },
        ],
        tools: ["Jenkins", "Curl", "AWS S3", "AWS CLI", "Twilio API", "Google Chat Webhooks", "Bash", "Groovy (Jenkins Pipeline)", "IP-API Geolocation"]
    },
    {
        id: 6,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://developers.google.com/static/chat/images/chat-product-icon.png",
            "https://www.twilio.com/content/dam/twilio-com/global/en/blog/legacy/2017/Twilio_Logo_Red-1.png",
            "https://curl.se/logo/curl-logo.svg",
        ],
        name: "Navo Fashion Health Check & Monitoring Pipeline",
        git: "https://github.com/shubhamkr83/navo-health-check-pipeline",
        live: "https://navofashion.in",
        category: "DevOps & CI/CD",
        overview: "Production-grade automated website health monitoring system for Navo Fashion (navofashion.in) with multi-channel alerting via Jenkins CI/CD. Performs scheduled HTTP health checks, monitors SSL certificate validity, tracks response times, and gathers geo-location server data. On failure detection, triggers instant alerts through Google Chat, WhatsApp messages to multiple team members, and automated voice calls. Generates comprehensive reports with timestamp, build details, server information, and uploads to AWS S3 for historical tracking and analysis.",
        features: [
            "Automated HTTP health checks: Monitors Navo Fashion website availability with curl-based validation",
            "Multi-channel alerting: Google Chat, WhatsApp messages, and automated voice calls on failures",
            "SSL certificate validation: Verifies SSL status and displays certificate health in reports",
            "Response time monitoring: Tracks and reports website response times for performance analysis",
            "Geo-location tracking: Captures server IP, country, region, city, and ISP information via IP-API",
            "AWS S3 report archiving: Timestamped failure reports uploaded to navo-health-check-report folder",
            "Multiple recipient support: Sends alerts to 3 team members via configured phone numbers",
            "Twilio integration: WhatsApp Business API and voice call functionality using Twilio",
            "Detailed failure reports: Comprehensive reports with build URL, timestamp, server info, SSL status",
            "Jenkins build tracking: Updates build descriptions and archives S3 URLs for easy access"
        ],
        pipelineFlow: {
            stages: [
                "Health Check",
                "Alert Generation",
                "Report Upload to S3",
                "Google Chat Notification",
                "WhatsApp Alerts",
                "Voice Call Alerts"
            ],
            postBuild: ["Always"]
        },
        highlights: [
            { value: "3", label: "Team members alerted" },
            { value: "3", label: "Alert channels" },
            { value: "navofashion.in", label: "Monitored site" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Check health", icon: "globe", detail: "Scheduled curl-based HTTP checks validate Navo Fashion website availability." },
                    { label: "Validate SSL", icon: "shield", detail: "SSL certificate validity and response time are checked and tracked." },
                    { label: "Locate server", icon: "search", detail: "IP-API returns server IP, country, region, city, and ISP information." },
                    { label: "Build report", icon: "report", detail: "Failure reports include build URL, timestamp, server info, and SSL status." },
                    { label: "Archive to S3", icon: "upload", detail: "Timestamped failure reports upload to the navo-health-check-report folder." },
                    { label: "Alert team", icon: "phone", detail: "Google Chat, WhatsApp, and voice calls reach 3 team members via Twilio." },
                ],
            },
        ],
        tools: ["Jenkins", "Curl", "AWS S3", "AWS CLI", "Twilio API", "Google Chat Webhooks", "Bash", "Groovy (Jenkins Pipeline)", "IP-API Geolocation"]
    },
    {
        id: 7,
        image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
        images: [
            "https://www.jenkins.io/images/logos/jenkins/jenkins.svg",
            "https://newman.postman.com/images/newman-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://developers.google.com/static/chat/images/chat-product-icon.png",
        ],
        name: "Payment Health Check API Automation",
        git: "https://github.com/shubhamkr83/payment-health-check-automation",
        live: "https://github.com/shubhamkr83/payment-health-check-automation",
        category: "Automation Testing",
        overview: "Critical payment gateway health monitoring automation using Postman collections with Jenkins CI/CD. Performs automated payment API health checks with intelligent 3-attempt retry mechanism (20-second delays), branch-specific S3 report organization, and failure-only Google Chat alerts. Generates timestamped Newman JSON/HTML reports with comprehensive test analysis including request/assertion success rates. Features strict report freshness validation (30-minute threshold), automated S3 uploads with size verification, and detailed failure reporting showing up to 10 failed tests with HTTP errors and assertion details.",
        features: [
            "Payment API health monitoring: Automated Postman collection execution via Newman CLI",
            "Intelligent retry logic: 3 attempts with 20-second delays for transient failure recovery",
            "Failure-only alerting: Google Chat notifications triggered only on payment test failures",
            "Branch-specific S3 organization: Separate folders for main, dev, and feature branches",
            "Comprehensive test analysis: Request/assertion success rates with detailed failure detection",
            "Timestamped reporting: JSON & HTML reports with strict 30-minute freshness validation",
            "Multi-environment support: Production (main/master) and development (dev/develop) workflows",
            "Detailed failure summaries: Shows up to 10 failed tests with HTTP status codes and assertions",
            "Automated S3 upload: Size-based verification with public-read ACL for team access",
            "Build artifact tracking: Archives S3 URLs and generates comprehensive build summaries"
        ],
        pipelineFlow: {
            stages: [
                "Checkout",
                "Setup Environment Variables",
                "Setup Node Environment",
                "Run Postman Tests",
                "Upload to S3",
                "Generate Report",
                "Send Notifications"
            ],
            postBuild: ["Always", "Failure", "Success"]
        },
        highlights: [
            { value: "3", label: "Retry attempts" },
            { value: "20s", label: "Retry delay" },
            { value: "30 min", label: "Report freshness check" },
            { value: "10", label: "Failed tests listed" },
        ],
        flows: [
            {
                title: "How it works",
                kind: "user",
                steps: [
                    { label: "Run Newman", icon: "play", detail: "Postman payment API health collections run automatically via Newman CLI." },
                    { label: "Retry failures", icon: "retry", detail: "Transient failures get 3 attempts with 20-second delays." },
                    { label: "Validate report", icon: "check", detail: "JSON and HTML reports must pass the 30-minute freshness validation." },
                    { label: "Upload to S3", icon: "upload", detail: "Reports upload to branch folders with size verification and public-read ACL." },
                    { label: "Analyze results", icon: "report", detail: "Request and assertion success rates are computed with failure details." },
                    { label: "Alert on failure", icon: "bell", detail: "Google Chat alerts fire only when payment tests fail, listing up to 10." },
                ],
            },
        ],
        tools: ["Node.js v20.15.0", "Newman", "Postman Collections", "Jenkins", "NVM", "AWS S3", "AWS CLI", "Google Chat Webhooks", "Bash", "Groovy (Jenkins Pipeline)", "JSON/HTML Reporters"]
    },
    // {
    //     id: 8,
    //     image: "https://user-images.githubusercontent.com/72254047/245164081-b56be2d6-2e3a-499f-96c7-dd6d4f1967c9.png",
    //     name: "Employee Review System",
    //     git: "https://github.com/shubhamkr83/Employee-Review-System",
    //     live: "https://ersystem-p85s.onrender.com",
    //     category: "Full Stack",
    // },

];

export default ProjectData;
