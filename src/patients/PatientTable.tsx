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

    ];
    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {showColumnFilters: true},
        manualFiltering: false,
        manualPagination: false,
        manualSorting: false,
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
    });

    return <Box margin={2}>
        <MaterialReactTable table={table}/>
    </Box>;
};


export default PatientTable;
