import {useState} from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
    useMaterialReactTable,
} from 'material-react-table';
import {Box, IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {keepPreviousData, useQuery,} from '@tanstack/react-query';
import {Link} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

type Patient = {
    id: number;
    firstName: string;
    lastName: string;
};

const PatientTable = () => {
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const {
        data = [],
        isError,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery<Patient[]>({
        queryKey: [
            'table-data'
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                'http://localhost:3001/patients',
            );
            const response = await fetch(fetchURL.href);
            return (await response.json()) as Patient[];
        },
        placeholderData: keepPreviousData,
    });


    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'age',
            header: 'Age',
        },
        {
            accessorKey: 'sex',
            header: 'Sex'
        }

    ];
    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {showColumnFilters: true, columnVisibility: {age: false, sex: false}},
        manualFiltering: false,
        manualPagination: false,
        manualSorting: false,
        enableStickyHeader: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                    <RefreshIcon/>
                </IconButton>
            </Tooltip>
        ),
        rowCount: data.length,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        enableRowActions: true,
        renderRowActions: (row) => (
            <Tooltip arrow title="View details">
                <Link to={`/patients/${row.row.original.id}`}>
                    <IconButton>
                        <VisibilityIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
        ),
    });

    return <Box margin={2}>
        <MaterialReactTable table={table}/>
    </Box>;
};


export default PatientTable;
