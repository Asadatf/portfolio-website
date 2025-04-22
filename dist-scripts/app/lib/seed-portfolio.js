"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPortfolio = seedPortfolio;
var upload_1 = require("./upload");
var portfolio_data_1 = require("./portfolio-data");
/**
 * Seed the vector database with portfolio chunks
 */
function seedPortfolio() {
    return __awaiter(this, void 0, void 0, function () {
        var chunks, _i, chunks_1, chunk, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log("🌱 Starting portfolio data seeding...");
                    chunks = __spreadArray(__spreadArray([
                        // Personal information chunks
                        {
                            id: "personal-info-1",
                            text: "Name: ".concat(portfolio_data_1.PORTFOLIO_INFO.personal.name, ". I am a ").concat(portfolio_data_1.PORTFOLIO_INFO.personal.title, ". I am ").concat(portfolio_data_1.PORTFOLIO_INFO.personal.Age, " years old, born on ").concat(portfolio_data_1.PORTFOLIO_INFO.personal.DOB, "."),
                        },
                        {
                            id: "personal-info-2",
                            text: "I am located in ".concat(portfolio_data_1.PORTFOLIO_INFO.personal.location, "."),
                        },
                        {
                            id: "personal-info-3",
                            text: "About me: ".concat(portfolio_data_1.PORTFOLIO_INFO.personal.about),
                        },
                        // Education chunks
                        {
                            id: "education-1",
                            text: "Education: I am pursuing a ".concat(portfolio_data_1.PORTFOLIO_INFO.education.degree, " at ").concat(portfolio_data_1.PORTFOLIO_INFO.education.university, " (").concat(portfolio_data_1.PORTFOLIO_INFO.education.period, ") in ").concat(portfolio_data_1.PORTFOLIO_INFO.education.location, " with a GPA of ").concat(portfolio_data_1.PORTFOLIO_INFO.education.gpa, "."),
                        },
                        {
                            id: "education-2",
                            text: "Previous Education: I completed my ".concat(portfolio_data_1.PORTFOLIO_INFO.education.previousEducation.degree, " at ").concat(portfolio_data_1.PORTFOLIO_INFO.education.previousEducation.institution, " (").concat(portfolio_data_1.PORTFOLIO_INFO.education.previousEducation.period, ") in ").concat(portfolio_data_1.PORTFOLIO_INFO.education.previousEducation.location, "."),
                        },
                        // Experience chunks
                        {
                            id: "experience-current",
                            text: "Current work: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.current, " Technologies used: ").concat(portfolio_data_1.PORTFOLIO_INFO.experience.currentTechnologies),
                        },
                        {
                            id: "experience-past",
                            text: "Past experience: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.past, " Technologies used: ").concat(portfolio_data_1.PORTFOLIO_INFO.experience.pastTechnologies),
                        },
                        // Skills chunks
                        {
                            id: "skills-programming",
                            text: "Programming Languages: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.programmingLanguages),
                        },
                        {
                            id: "skills-web",
                            text: "Web Development Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.webDevelopment),
                        },
                        {
                            id: "skills-backend",
                            text: "Backend & CMS Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.backend),
                        },
                        {
                            id: "skills-cloud",
                            text: "Cloud & DevOps Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.cloudDevOps),
                        },
                        {
                            id: "skills-ml",
                            text: "Machine Learning Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.machineLearning),
                        },
                        {
                            id: "skills-game",
                            text: "Game Development Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.gameDevelopment),
                        },
                        {
                            id: "skills-soft",
                            text: "Soft Skills: ".concat(portfolio_data_1.PORTFOLIO_INFO.experience.skills.softSkills),
                        }
                    ], portfolio_data_1.PORTFOLIO_INFO.projects.map(function (project, index) { return ({
                        id: "project-".concat(index),
                        text: "Project: ".concat(project.title, ". Description: ").concat(project.description, ". Technologies used: ").concat(project.technologies, ". ").concat(project.link ? "Live link: ".concat(project.link, ".") : "", " GitHub: ").concat(project.github),
                    }); }), true), [
                        // Awards chunks
                        {
                            id: "awards",
                            text: "Awards and Achievements: ".concat(portfolio_data_1.PORTFOLIO_INFO.awards.join(". ")),
                        },
                        // Contact information
                        {
                            id: "contact-info",
                            text: "Email: ".concat(portfolio_data_1.PORTFOLIO_INFO.contact.email, ", LinkedIn: ").concat(portfolio_data_1.PORTFOLIO_INFO.contact.linkedin, ", GitHub: ").concat(portfolio_data_1.PORTFOLIO_INFO.contact.github),
                        },
                    ], false);
                    _i = 0, chunks_1 = chunks;
                    _a.label = 1;
                case 1:
                    if (!(_i < chunks_1.length)) return [3 /*break*/, 4];
                    chunk = chunks_1[_i];
                    console.log("\uD83D\uDCDD Storing chunk: ".concat(chunk.id));
                    return [4 /*yield*/, (0, upload_1.storeDocument)(chunk.id, chunk.text)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("✅ Portfolio data seeding completed successfully!");
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("❌ Error seeding portfolio data:", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// If this file is run directly, seed the database
if (require.main === module) {
    seedPortfolio()
        .then(function () { return process.exit(0); })
        .catch(function (err) {
        console.error("Failed to seed portfolio data:", err);
        process.exit(1);
    });
}
