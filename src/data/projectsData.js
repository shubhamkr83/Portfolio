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
        overview: "An enterprise-grade REST API automation framework featuring dual API support for BOMB (Admin/Seller operations at bizup.app) and Buyer App (Navo Fashion consumer API at api.navofashion.in). This production-ready framework converts a complete Postman collection into a robust RestAssured + TestNG solution with 56 test files, 40+ endpoints, comprehensive CI/CD integration, and automated reporting. Features include JWT authentication, AI-powered video title generation, performance validation (800ms threshold for Buyer App), and complete workflow pipeline testing with 95%+ success rate.",
        features: [
            "Dual API architecture: BOMB API (26 tests, 4 pipelines) and Buyer App (30 tests, 8 features)",
            "Complete JWT authentication flow with automatic token injection and VariableManager",
            "AI integration for video title generation from tags with context-aware processing",
            "Performance testing with strict thresholds (800ms for Buyer App, 40s for BOMB)",
            "Advanced validations: 30+ required fields, MongoDB ID formats, Firebase URLs, phone patterns",
            "Comprehensive CI/CD: Jenkins automation, AWS S3 timestamped reports, email & Google Chat alerts",
            "Pipeline-based testing: Login → Catalog Search → Tagging → Video Operations workflows",
            "Feature-rich reporting: Interactive Allure dashboards with test timelines and flaky detection",
            "Data-driven architecture: POJO models with Jackson, Lombok, nested object support",
            "Production-ready features: Retry analyzer, parallel execution, JSON schema validation, Log4j2"
        ],
        structure: "Clean architecture with dual API support (BOMB and Buyer App) sharing a unified framework. Base layer includes TestNG BaseTest, ConfigManager with Owner properties, and RestClient wrapper. Constants layer manages BombEndpoints and BuyerAppEndpoints. Request/Response POJOs handle complex nested structures (LoginResponse, CatalogResponse, FeedFilterResponse). CI/CD pipeline integrates Jenkins with Python scripts for TestNG result parsing, email/chat notifications, and S3 uploads with timestamped folders. Test execution uses priority-based dependencies and VariableManager for cross-test data sharing.",
        testing: {
            testTypes: ["API Tests", "Integration Tests", "Performance Tests"],
            apiTargets: ["BOMB API (26 tests)", "Buyer App API (30 tests)"],
            profiles: ["All", "BOMB-Pipeline", "BuyerApp-Pipeline"]
        },
        pipelineFlow: {
            stages: ["Checkout", "Run Tests", "Setup Allure", "Generate Report", "Upload to S3", "Extract Summary", "Send Notifications", "Archive Links", "Publish Results"],
            postBuild: ["Always", "Failure", "Success", "Unstable"]
        },
        tools: ["Java 17", "Maven", "RestAssured 5.3+", "TestNG 7.8+", "Allure 2.24+", "Jenkins", "AWS S3", "Python 3", "Jackson 2.15", "Lombok 1.18", "Log4j2 2.20", "Hamcrest 2.2", "Owner 1.0.12", "Google Chat Webhooks", "SMTP Email"]
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
        tools: ["Java 8+", "Appium 10.0.0", "TestNG 7.11.0", "Maven", "ExtentReports 5.1.2", "Log4j2 2.24.3", "BrowserStack Java SDK 1.39.1", "JavaMail 1.6.2", "Jackson", "Commons IO", "Android SDK", "Node.js"]
    },
    {
        id: 3,
        image: "https://www.postman.com/assets/logos/postman-logo-stacked.svg",
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
        tools: ["Jenkins", "Curl", "AWS S3", "AWS CLI", "Twilio API", "Google Chat Webhooks", "Bash", "Groovy (Jenkins Pipeline)", "IP-API Geolocation"]
    },
    {
        id: 7,
        image: "https://www.postman.com/assets/logos/postman-logo-stacked.svg",
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
