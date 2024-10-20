
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router()

router.post('/create-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.insertIntoDB)

router.get('/', AcademicSemesterController.getAllSemesters)

router.get('/:id', AcademicSemesterController.getSingleSemester)

export const AcademicSemesterRoutes = router;