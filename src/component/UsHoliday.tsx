import { useEffect, useState } from "react";
import { apiLink } from "../api_links";
import styled from "styled-components";
import axios from "axios";
interface apiProps {
  name: string;
  date: string;
  countryCode: string;
}

const UsHoliday = () => {
  const HolidayWrapper = styled.div``;
  const [apiData, setApiData] = useState<apiProps[]>();
  useEffect(() => {
    fetchDataApi();
  }, []);
  //!fetching the api data using async await

  //   const fetchDataApi = async () => {
  //     try {
  //       const response = await fetch(apiLink);
  //       const data = await response.json();
  //       setApiData(data);
  //     } catch (error) {
  //       console.error(
  //         "Quelque chose n'a pas fonctionné Veuillez réessayer",
  //         error
  //       );
  //     }
  //   };
  //!fetching the api data using AXIOS
  const fetchDataApi = () => {
    axios
      .get(apiLink)
      .then((Response) => {
        setApiData(Response.data);
      })
      .catch((error) => {
        console.error(
          "Quelque chose n'a pas fonctionné Veuillez réessayer",
          error
        );
      });
  };
  //!function to change the date format
  function changeDateFormat(dateString: string | number | Date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    const date = new Date(dateString);
    return date.toLocaleString("EN-Uk", options);
  }
  return (
    <HolidayWrapper>
      {apiData && apiData.length > 0 && (
        <h2>Public Holidays {apiData[0].countryCode}</h2>
      )}

      <table className="caption-top md:caption-bottom">
        <thead>
          <tr>
            <th>Date</th>
            <th>Holiday Type</th>
          </tr>
        </thead>
        <tbody>
          {apiData &&
            apiData.map((info, index) => (
              <tr key={index}>
                <td>{changeDateFormat(info.date)}</td>
                <td>{info.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </HolidayWrapper>
  );
};

export default UsHoliday;
