import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { buildingRoutes } from '../modules/building/building.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes
  },
  {
    path: '/faculties',
    route: facultyRoutes
  },
  {
    path: '/students',
    route: studentRoutes
  },
  {
    path: '/buildings',
    route: buildingRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
