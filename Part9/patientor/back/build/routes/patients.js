"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patientService_1 = __importDefault(require("../services/patientService"));
router.get('/', (_req, res) => {
    const patients = patientService_1.default.getNonSensitivePatientDatas();
    res.send(patients);
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService_1.default.addPatient({ name, dateOfBirth, ssn, gender, occupation });
    res.json(newPatient);
});
exports.default = router;
