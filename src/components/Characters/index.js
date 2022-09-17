import { Avatar, List, Modal, PageHeader } from "antd";
import { useState } from "react";
import styles from "./styles.module.css";

export const Characters = ({
  characterData,
  handlePage,
  getCharactersData,
  characterURL,
  characterLoading,
  flimsData,
}) => {
  const [selectedData, setSelectedData] = useState(null);
  return (
    <div>
      <PageHeader
        onBack={() => handlePage(0)}
        title="Characters"
        style={{ backgroundColor: "#fff" }}
      />
      <List
        bordered
        footer={
          characterURL !== null && !characterLoading ? (
            <div style={{ textAlign: "center" }}>
              <a href="#" onClick={() => getCharactersData()}>
                Load more...
              </a>
            </div>
          ) : null
        }
        dataSource={characterData}
        className={styles.list}
        renderItem={(item, index) => (
          <List.Item
            key={`list${index}`}
            onClick={() => {
              setSelectedData({ ...item });
            }}
            style={{ cursor: "pointer" }}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: "crimson", color: "#fff" }}>
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={item.name}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            />
          </List.Item>
        )}
      />
      {!!selectedData && (
        <Modal
          title={selectedData?.name || ""}
          open={true}
          onOk={() => {}}
          onCancel={() => setSelectedData(null)}
          footer={null}
        >
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here'.
          </p>
          <div className={styles.gridcontainer}>
            <div>
              <span className={styles.lable}>Height : </span>
              <span className={styles.text}>{selectedData.height}</span>
            </div>
            <div>
              <span className={styles.lable}>Mass : </span>
              <span className={styles.text}>{selectedData.mass}</span>
            </div>
            <div>
              <span className={styles.lable}>Gender : </span>
              <span className={styles.text}>{selectedData.gender}</span>
            </div>
            <div>
              <span className={styles.lable}>Hair color : </span>
              <span className={styles.text}>
                <div
                  className={styles.rect}
                  style={{
                    backgroundColor: selectedData?.hair_color
                      .trim()
                      .split(",")?.[0],
                  }}
                ></div>{" "}
                {selectedData.hair_color}
              </span>
            </div>
            <div>
              <span className={styles.lable}>Skin color : </span>
              <span className={styles.text}>
                <div
                  className={styles.rect}
                  style={{
                    backgroundColor: selectedData?.skin_color
                      .trim()
                      .split(",")?.[0],
                  }}
                ></div>{" "}
                {selectedData.skin_color}
              </span>
            </div>
            <div>
              <span className={styles.lable}>Eye color : </span>
              <span className={styles.text}>
                <div
                  className={styles.rect}
                  style={{
                    backgroundColor: selectedData?.eye_color
                      .trim()
                      .split(",")?.[0],
                  }}
                ></div>{" "}
                {selectedData.eye_color}
              </span>
            </div>
          </div>
          <div className={styles.flimcontainer}>
            <div className={styles.text}>
              Flims ({selectedData?.films.length})
            </div>
            {selectedData?.films.map((url) => {
              const data = flimsData.filter((ele) => ele.url === url);
              return data.length > 0 ? (
                <div className={styles.lable}>{data[0].title}</div>
              ) : null;
            })}
          </div>
        </Modal>
      )}
    </div>
  );
};
