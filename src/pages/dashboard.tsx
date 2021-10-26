import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import dymaic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
import {useEffect} from 'react';
import { Me } from "../services/auth/authService";
import { AuthServerSideProps } from "../serverRender/auth";
const Chart = dymaic(import('react-apexcharts'), { ssr: false});

const series = [
    { name: "serie1", data: [31,120,10,28,7, 54, 78] }
];

const options:ApexOptions = {
    chart: {
        toolbar:{
            show: false, //REMOVE O MENU
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: "datetime",
        categories: [
            "2021-10-01", "2021-10-02", "2021-10-03", "2021-10-04", "2021-10-05", "2021-10-06", "2021-10-07" 
        ]
    },
    fill: {
        opacity: 0.3,
        type: "gradient",
        gradient: {
            shade: "dark",
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
    
}


export default function Dashboard() {
    useEffect(() => {
        Me().then(response => console.log(response))
            .catch(() => console.log("401"))
    }, []);
    return (
        <>
            <Flex direction="column" h="100vh">
                <Header />
                <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
                    <Sidebar />
                    <SimpleGrid flex="1" align="flex-start" minChildWidth="320px" gap="4" mb="4">
                        <Box p="8" bg="gray.800" borderRadius={8} pb="4">
                            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                            <Chart type="area" height={160} options={options} series={series} />
                        </Box>
                        <Box p="8" bg="gray.800" borderRadius={8} pb="4">
                            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                            <Chart type="area" height={160} options={options} series={series} />
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Flex>
        </>
    )
}

export const getServerSideProps = AuthServerSideProps(async () => {
    return{
        props:{

        }
    }
})