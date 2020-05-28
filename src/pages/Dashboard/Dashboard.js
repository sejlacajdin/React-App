import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Header from "../../components/Header/Header";

import "./Dashboard.css";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <Helmet>
        <title>Autoversand | Dashboard</title>
      </Helmet>
      <Header />
      <div className="dashboard__main">
            <h1>Dashboard</h1>
      <div className="dashboard__content">
      <section className="content__firstSection">
          <div className="section__div content__div"></div>
          <div className="section__div">
          <div className="content__div firstSection__div"></div>
          <div  className="content__div firstSection__div"></div>
          </div>
      </section>
      <section className="content__secondSection">
      <div className="section__div content__div"></div>
      <div className="section__div content__div"></div>
      </section>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
