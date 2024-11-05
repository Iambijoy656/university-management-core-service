import { Building, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { buildingSearchableFields } from "./building.constants";
import { IBuildingFilterRequest } from "./building.interface";

const insertIntoDB = async (data: Building): Promise<Building> => {
    const result = await prisma.building.create({
        data
    })

    return result

}

const getAllFromDb = async (filters: IBuildingFilterRequest, paginationOptions: IPaginationOptions): Promise<IGenericResponse<Building[]>> => {

    const { searchTerm } = filters;

    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);


    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            OR: buildingSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }


    const whereConditions: Prisma.BuildingWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}


    const result = await prisma.building.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: 'desc'
        }

    })

    const total = await prisma.building.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }

}



export const BuildingService = {
    insertIntoDB,
    getAllFromDb
}