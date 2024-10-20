import { AcademicSemester, Prisma } from "@prisma/client";
import { IGenericResponse } from "university-management-core-service/src/interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { academicSemesterSearchableFields } from "./academicSemester.constant";
import { IAcademicSemesterFilters } from "./academicSemester.interface";

const insertIntoDB = async (academicSemesterData: AcademicSemester): Promise<AcademicSemester> => {

    const result = await prisma.academicSemester.create({
        data: academicSemesterData
    })

    return result;

}


const getAllSemesters = async (
    filters: IAcademicSemesterFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);


    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            OR: academicSemesterSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }


    // Object.keys(filtersData).map(key => console.log(key))


    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: {
                    equals: (filtersData as any)[key],
                    mode: 'insensitive'
                }
            }))
        })
    }


    const whereConditions: Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    // const result = await prisma.academicSemester.findMany({
    //     where: {
    //         OR: [
    //             {
    //                 title: {
    //                     contains: searchTerm,
    //                     mode: 'insensitive'
    //                 }
    //             },
    //             {
    //                 code: {
    //                     contains: searchTerm,
    //                     mode: 'insensitive'

    //                 }
    //             }
    //         ]

    //     },
    //     skip,
    //     take: limit

    // })

    const result = await prisma.academicSemester.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: 'desc'
        }


    })

    const total = await prisma.academicSemester.count()

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};



const getSingleSemester = async (id: string): Promise<AcademicSemester | null> => {

    const result = await prisma.academicSemester.findUnique({
        where: {
            id
        }
    })

    return result;

}


export const AcademicSemesterService = {
    insertIntoDB,
    getAllSemesters,
    getSingleSemester
}