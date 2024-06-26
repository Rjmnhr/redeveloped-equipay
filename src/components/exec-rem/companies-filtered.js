import { Input, Modal, Spin, Table } from "antd";

import React, { useEffect, useState } from "react";
import { CompaniesFilteredStyled } from "./style";

import { useNavigate } from "react-router-dom";
import emptyBox from "../../icons/empty-box.png";
import { ArrowForward } from "@mui/icons-material";
import AxiosInstance from "../../config/axios";
import NavBar from "../layout/nav-bar";
import BasedOnIndex from "./input-options/based-on-index";
import HandSelectedPeers from "./input-options/hand-selected-peers";
import { useApplicationContext } from "../../context/app-context";
export const TableComponentMobile = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const storeOption = sessionStorage.getItem("option");

  const navigate = useNavigate();

  const data = JSON.parse(sessionStorage.getItem("companies"));

  const [sectors, setSectors] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/benchmark/sectors")
      .then(async (res) => {
        const response = await res.data;

        const sectorGroupValues = response.map(
          (item) => Object.values(item)[0]
        );

        // Filter out null and blank values
        const filteredValues = sectorGroupValues.filter(
          (value) => value !== null && value.trim() !== ""
        );
        // Create a new Set to store unique values
        const uniqueSet = new Set(filteredValues);

        // Convert the Set back to an array
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        setSectors(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Initially, select all rows and store them in the selectedCompanies state
    const initialSelectedRowKeys = data.map((_, index) => index);
    setSelectedRowKeys(initialSelectedRowKeys);
    setSelectedCompanies(data);
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Companies",
      dataIndex: "companies",
    },
  ];

  const formattedData = data.map((element, index) => {
    return { key: index, companies: element.company_name };
  });

  const onSelectChange = (newSelectedRowKeys) => {
    const updatedSelectedCompanies = newSelectedRowKeys.map(
      (index) => data[index]
    );
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedCompanies(updatedSelectedCompanies);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleContinue = () => {
    sessionStorage.setItem(
      "companies-selected",
      JSON.stringify(selectedCompanies)
    );
    navigate("/role-information");
  };

  const tableScroll = {
    y: "55vh", // Set the height at which the body will start scrolling
  };
  const [filters, setFilters] = useState({});
  //eslint-disable-next-line
  const handleFilterChange = (columnKey, value) => {
    // Update the filter state
    setFilters({
      ...filters,
      [columnKey]: value,
    });
  };

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        ?.toLowerCase()
        .includes(value?.toLowerCase());
    },
  });

  const columnsWithFilter = columns.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.dataIndex, column.title),
  }));

  return (
    <>
      <NavBar />
      <div
        style={{
          marginTop: "70px",
          background: "#5783db",
          minHeight: "92vh",
          color: "white",
        }}
      >
        <CompaniesFilteredStyled>
          {data?.length > 0 ? (
            <div
              className="p-3 "
              style={{ display: "grid", justifyItems: "center" }}
            >
              <h3>List of companies based on your selection </h3>
              <p>
                You have the option to deselect any company that you do not wish
                to include in the analysis.
              </p>
              <div className="col-lg-10 col-12 ">
                <Table
                  rowSelection={rowSelection}
                  columns={columnsWithFilter} // <-- Replace this line
                  dataSource={formattedData}
                  pagination={false}
                  scroll={tableScroll}
                />
              </div>

              <button
                style={{ width: "90%" }}
                onClick={handleContinue}
                type="submit"
                className="btn  btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
              >
                Continue <ArrowForward />
              </button>
            </div>
          ) : (
            <>
              <div
                className="p-3 "
                style={{ display: "grid", justifyItems: "center" }}
              >
                <h3>No companies has selected based on your selection </h3>
                <p>Try giving different inputs</p>
                {storeOption === "index" ? (
                  <BasedOnIndex sectors={sectors} />
                ) : (
                  <HandSelectedPeers sectors={sectors} />
                )}
              </div>
            </>
          )}
        </CompaniesFilteredStyled>
      </div>
    </>
  );
};

const TableComponent = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompaniesList, setSelectedCompaniesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [initialCompaniesOrder, setInitialCompaniesOrder] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sectors, setSectors] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const storeOption = sessionStorage.getItem("option");
  const data = JSON.parse(sessionStorage.getItem("companies"));
  const { isMobile } = useApplicationContext();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    AxiosInstance.get("/api/benchmark/sectors")
      .then(async (res) => {
        const response = await res.data;

        const sectorGroupValues = response.map(
          (item) => Object.values(item)[0]
        );

        // Filter out null and blank values
        const filteredValues = sectorGroupValues.filter(
          (value) => value !== null && value.trim() !== ""
        );
        // Create a new Set to store unique values
        const uniqueSet = new Set(filteredValues);

        // Convert the Set back to an array
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        setSectors(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const data = JSON.parse(sessionStorage.getItem("companies"));

    // Filter out null and blank values
    const filteredValues = data.filter(
      (value) =>
        value.company_name !== null && value.company_name?.trim() !== ""
    );
    // Create a new Set to store unique values
    const uniqueSet = new Set(filteredValues);

    // Convert the Set back to an array
    const uniqueArray = Array.from(uniqueSet);
    uniqueArray.sort();
    // Store the initial order of companies
    setInitialCompaniesOrder(uniqueArray);

    // Set the companies state for display
    setCompanies(uniqueArray);
    setIsLoading(false);
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.company_name?.toLowerCase().includes(filterText?.toLowerCase())
  );

  const handleRowClick = (selectedCompany) => {
    // Remove selected company from companies array
    const updatedCompanies = companies.filter(
      (company) => company !== selectedCompany
    );
    setCompanies(updatedCompanies);

    // Add selected company to selectedCompaniesList
    setSelectedCompaniesList((prevSelected) => [
      ...prevSelected,
      selectedCompany,
    ]);
  };

  const handleRemoveCompany = (removedCompany) => {
    // Remove the company from the selectedCompaniesList
    const updatedSelectedCompaniesList = selectedCompaniesList.filter(
      (company) => company !== removedCompany
    );
    setSelectedCompaniesList(updatedSelectedCompaniesList);

    // Add the removed company back to the companies array maintaining the initial order
    setCompanies((prevCompanies) => {
      const updatedCompanies = [...prevCompanies, removedCompany];
      updatedCompanies.sort(
        (a, b) =>
          initialCompaniesOrder.indexOf(a) - initialCompaniesOrder.indexOf(b)
      );
      return updatedCompanies;
    });
  };

  // Function to handle the "Select All" checkbox change
  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);

    if (e.target.checked) {
      // If "Select All" is checked, remove all companies from the List of Companies table
      setCompanies([]);
      // Update the selectedCompaniesList with all companies
      setSelectedCompaniesList([...initialCompaniesOrder]);
    } else {
      // If "Select All" is unchecked, restore the original order of companies
      setCompanies([...initialCompaniesOrder]);
      // Clear the selectedCompaniesList
      setSelectedCompaniesList([]);
    }
  };

  const handleContinue = () => {
    if (selectedCompaniesList.length < 10) {
      showModal();
      return;
    } else {
      sessionStorage.setItem(
        "companies-selected",
        JSON.stringify(selectedCompaniesList)
      );
      navigate("/role-information");
    }
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          marginTop: "80px",
          background: "#5783db",
          minHeight: "100vh",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        {data?.length > 0 ? (
          <div className="container p-0 p-lg-3">
            <h3 className="mb-3" style={{ color: "white" }}>
              List of companies based on your selection{" "}
            </h3>
            <p>Add the companies you want to include in the analysis</p>
            {/* <p>
                You have the option to deselect and select any company that you do not wish
                to include in the analysis.
              </p> */}
            <div className="d-lg-flex mt-3">
              <div
                className="col-12 col-lg-6 border p-0 mx-lg-2 mb-3 mb-lg-0"
                style={{
                  height: "50vh", // Adjust the height as needed
                  overflowY: "scroll",
                }}
              >
                <table className="table text-left scrollable-container">
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "white",
                      color: "black",
                    }}
                  >
                    <tr>
                      <th className="d-md-flex flex-wrap justify-content-between align-items-center ">
                        <span>
                          {" "}
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                          />{" "}
                          List of companies (
                          <span className="text-primary">
                            {companies.length}
                          </span>
                          )
                        </span>
                        <Input
                          type="text"
                          style={{
                            border: "1px solid #ced4da",
                            width: "25%",
                          }}
                          className="mr-2  mt-1 mt-lg-0 !important"
                          placeholder="Search companies"
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <div
                        style={{
                          display: "grid",
                          height: "30vh",
                          justifyItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <Spin size="large" />

                        <p>Loadiing...</p>
                      </div>
                    ) : selectedCompaniesList.length ===
                      initialCompaniesOrder.length ? (
                      <div
                        style={{
                          display: "grid",
                          height: "30vh",
                          placeItems: "center",
                        }}
                      >
                        <p>All listed companies have been selected</p>
                      </div>
                    ) : (
                      filteredCompanies.map((item, index) => (
                        <tr
                          style={{ width: "100%" }}
                          key={index}
                          onClick={() => handleRowClick(item)}
                        >
                          <td
                            style={{
                              padding: "5px 10px",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            {item.company_name}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="col-12 col-lg-6 scrollable-container  border p-0"
                style={{ height: "50vh", overflowY: "scroll" }}
              >
                <table className="table  text-left ">
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "white",
                      color: "black",
                    }}
                  >
                    <tr>
                      <th className="p-3">
                        Selected Companies (
                        <span className="text-primary">
                          {selectedCompaniesList.length}
                        </span>
                        )
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCompaniesList.length > 0 ? (
                      selectedCompaniesList.map((item, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "5px 10px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {item.company_name}
                            {/* Add a remove button or cross button */}
                            <button
                              style={{ color: "black" }}
                              className="btn btn-link btn-sm"
                              onClick={() => handleRemoveCompany(item)}
                            >
                              {isMobile ? "x" : "Remove"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          height: "30vh",
                          placeItems: "center",
                        }}
                      >
                        <img src={emptyBox} alt="" height={100} width={100} />
                        <p>No companies selected</p>
                      </div>
                    )}
                  </tbody>
                </table>
                <Modal
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null} // To remove footer buttons
                  centered
                >
                  <h5>
                    Please select at least 10 companies for meaningful analysis
                  </h5>
                </Modal>
              </div>
            </div>
            <div className="mb-3 mt-3 d-flex justify-content-center">
              <button
                style={{
                  marginBottom: `${isMobile ? "200px" : ""}`,
                  width: `${isMobile ? "100%" : "25%"}`,
                }}
                onClick={handleContinue}
                type="submit"
                className="btn btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
              >
                Next <ArrowForward />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="p-3 "
              style={{ display: "grid", justifyItems: "center" }}
            >
              <h3>No companies has selected based on your selection </h3>
              <p>Try giving different inputs</p>
              {storeOption === "index" ? (
                <BasedOnIndex sectors={sectors} />
              ) : (
                <HandSelectedPeers sectors={sectors} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TableComponent;
