import {Box, Button, CircularProgress, Container, Typography} from '@mui/material';
import {keepPreviousData, useQuery,} from '@tanstack/react-query';
import {Link, useParams} from "react-router-dom";

type Patient = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
};

const PatientDetail = () => {

    const params = useParams()

    const {
        data,
        isError,
        isLoading,
    } = useQuery<Patient>({
        queryKey: [
            'patient-detail'
        ],
        queryFn: async () => {
            console.log(params)
            const fetchURL = new URL(
                'http://localhost:3001/patients/' + params.patientId,
            );
            const response = await fetch(fetchURL.href);
            return (await response.json()) as Patient;
        },
        placeholderData: keepPreviousData,
    });

    if (isError) return <Box>Something went wrong...</Box>;

    if (isLoading || !data) return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    );
    return (
        <Container>
            <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>

                <div>
                    <Typography variant="h4" color="textSecondary">
                        {data.firstName} {data.lastName}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        ID : {data.id}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Age: {data.age}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Sex: {data.sex}
                    </Typography>
                </div>
            </div>
            <Link to={`/patients`}>
                <Button variant="contained" color="primary">
                    Back to list
                </Button>
            </Link>
        </Container>
    );

};


export default PatientDetail;
