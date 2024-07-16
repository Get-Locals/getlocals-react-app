import React from 'react';
import {useGetEmployeesQuery} from "../../redux/services/businessAPI";
import GetAnimation from "../util/GetAnimation";
import styled from "styled-components";

const EmployeeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 30px;
  width: 80%;
  animation: fadeIn 0.4s ease-in;
  align-items: stretch; /* Ensure children stretch to the same height */
`;

const EmployeeContainer = styled.div`
  flex: 1 1 300px; /* Ensure each container has a minimum width of 300px */
  width: 300px; /* Ensure each container doesn't exceed 300px */
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0; /* Use your primary background color */
  color: #333; /* Use your primary color */
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #fff;
  align-items: center;
  height: 100%;
  justify-content: space-between; /* Ensure proper spacing between items */
`;

const EmployeeImage = styled.img`
  height: 250px;
  object-fit: contain;
  width: 100%;
`;

const EmployeeInfo = styled.div`
  margin-top: 20px; /* Add some space between image and info */
  text-align: center;
  flex: 1; /* Allow EmployeeInfo to grow and fill the remaining space */
`;

const TeamTemplate1 = ({businessId}) => {
    const {
        data: teamData,
        isLoading: loadingTeamData
    } = useGetEmployeesQuery({businessId: businessId})

    return <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexWrap: "wrap"
    }}>
        <div className={'heading'} style={{
            width: '100%'
        }}>
            <p style={{
                textAlign: 'center',
                fontSize: 'xxx-large',
                fontWeight: 'bolder'
            }}>Meet our team</p>
        </div>
        <EmployeeListContainer>
            {teamData?.map((employee) => (
                <GetAnimation animateIn={"zoomIn"} duration={1} key={employee.id}>
                    <EmployeeContainer key={employee.id}>
                        <EmployeeImage
                            loading={"lazy"}
                            src={employee.image?.url}
                            alt={employee.displayName}
                        />
                        <EmployeeInfo>
                            <h1>{employee.displayName}</h1>
                            <p>{employee.description}</p>
                        </EmployeeInfo>
                    </EmployeeContainer>
                </GetAnimation>
            ))}
        </EmployeeListContainer>
    </div>
}

export default TeamTemplate1;
