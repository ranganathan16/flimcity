import { Card, Skeleton, Typography } from "antd";
import React from "react";
import styles from "./styles.module.css";

const { Paragraph, Title } = Typography;

export const Flims = ({ flimsData, flimsLoading, handlePage }) => {
  return (
    <div className={styles.flimcontainer}>
      {flimsData.map((row, index) => {
        return (
          <Card
            hoverable
            key={`flim${index}`}
            className={styles.card}
            onClick={() => handlePage(1)}
          >
            <Title level={3}> {row.title}</Title>
            <Paragraph
              ellipsis={{
                rows: 3,
                expandable: false,
                suffix: "",
              }}
            >
              {row.opening_crawl}
            </Paragraph>
            <div>
              <span className={styles.lable}>Director : </span>
              <span className={styles.text}>{row.director}</span>
            </div>
            <div>
              <span className={styles.lable}>Producer : </span>
              <span className={styles.text}>{row.producer}</span>
            </div>
            <div>
              <span className={styles.lable}>Release Date : </span>
              <span className={styles.text}>{row.release_date}</span>
            </div>
          </Card>
        );
      })}

      {flimsLoading &&
        [...Array(9)].map((row, index) => {
          return (
            <Card key={`loading${index}`} loading={true}>
              <Skeleton loading={true} active avatar />
            </Card>
          );
        })}
    </div>
  );
};
