"use client"

import { DataTable } from "@/components/table/Table";
import { clientApiRequest } from "@/services/clientApiRequest";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./table/columns";
import { ApiResponse } from "./dataType";
import { TableHeading } from "./table/TableHeading";
import { useState } from "react";

const fetchData = async (): Promise<ApiResponse> => {
    try {
        const response = await clientApiRequest({
            url: 'vendors',
            method: 'GET'
        });
        return response as ApiResponse;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
    }
};

const Page = () => {
    const { data, error, isLoading, refetch } = useQuery<ApiResponse>({
        queryKey: ['vendors'],
        queryFn: fetchData,
    });

    if (isLoading) return <p className="text-center text-gray-500">Loading data...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching data</p>;

    return (
        <>
            <DataTable
                data={data?.data ?? []}
                columns={columns}
                componenstHeading={<TableHeading refetch={refetch}/>}
                paramSearch={"name_of_bisnis"}
                placeholderSearch={"Cari berdasarkan nama"}
            />
        </>
    );
};

export default Page;
