"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const { v1: uuid } = require('uuid');
const getPatientDatas = () => {
    return patients_1.default;
};
const getNonSensitivePatientDatas = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: uuid() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatientDatas,
    getNonSensitivePatientDatas,
    addPatient
};
