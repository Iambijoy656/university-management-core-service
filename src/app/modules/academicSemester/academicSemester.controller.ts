import { AcademicSemester } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicSemesterFilterableFields } from "./academicSemester.constant";
import { AcademicSemesterService } from "./academicSemester.service";



const insertIntoDB: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AcademicSemesterService.insertIntoDB(req.body)

        sendResponse<AcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester created successfully',
            data: result,
        });
    }
);



const getAllSemesters = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, academicSemesterFilterableFields);

    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };

    const paginationOptions = pick(req.query, paginationFields);


    // console.log(req.query);
    // console.log('paginationOption', paginationOptions);
    // console.log('filters', filters);

    const result = await AcademicSemesterService.getAllSemesters(
        filters,
        paginationOptions
    );

    sendResponse<AcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semesters retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});


const getSingleSemester = catchAsync(async (req: Request, res: Response) => {

    const result = await AcademicSemesterService.getSingleSemester(req.params.id)

    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Retrieve successfully',
        data: result,
    });
})





export const AcademicSemesterController = {
    insertIntoDB,
    getAllSemesters,
    getSingleSemester
}
