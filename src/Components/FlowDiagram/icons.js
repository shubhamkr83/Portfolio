import {
    FiUser, FiLock, FiKey, FiCode, FiPlay, FiCheck, FiXCircle, FiFileText,
    FiCloud, FiUploadCloud, FiBell, FiMessageSquare, FiMail, FiPhone,
    FiGitCommit, FiTool, FiEdit3, FiShield, FiGlobe, FiClock, FiRotateCw,
    FiDatabase, FiSmartphone, FiSearch, FiShoppingCart, FiVideo, FiServer,
    FiCpu, FiGitBranch, FiArchive, FiCircle,
} from "react-icons/fi";

// One entry per icon key used by flows[].steps[].icon in projectsData.js.
export const ICONS = {
    user: FiUser,
    lock: FiLock,
    key: FiKey,
    code: FiCode,
    play: FiPlay,
    check: FiCheck,
    fail: FiXCircle,
    report: FiFileText,
    cloud: FiCloud,
    upload: FiUploadCloud,
    bell: FiBell,
    chat: FiMessageSquare,
    mail: FiMail,
    phone: FiPhone,
    git: FiGitCommit,
    build: FiTool,
    sign: FiEdit3,
    shield: FiShield,
    globe: FiGlobe,
    clock: FiClock,
    retry: FiRotateCw,
    db: FiDatabase,
    device: FiSmartphone,
    search: FiSearch,
    cart: FiShoppingCart,
    video: FiVideo,
    server: FiServer,
    ai: FiCpu,
    branch: FiGitBranch,
    archive: FiArchive,
};

export const FallbackIcon = FiCircle;

export const getIcon = (key) => ICONS[key] || FallbackIcon;
