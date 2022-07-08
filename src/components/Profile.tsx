import "./profile.css";
import Topbar from "./TopBar";
import PostUser from "./PostUser";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
export default function Profile(props: any) {
  //   interface CustomizedState {
  //     myState: string;
  //   }

  const userLoggato = localStorage.getItem("Loggato");
  const location = useLocation();
  const user = location.state as any;
  const [change, setChange] = React.useState(false);

  const userEntry = user.user || "sconosciuto";

  //   const location = useLocation();
  //   const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  //   const { myState } = state;

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="asset/sociale2.png"
                alt=""
              />
              <img className="profileUserImg" src="asset/social.jpg" alt="" />
            </div>

            <div className="profileInfo">
              <h2 className="profileInfoName">{userEntry}</h2>

              <h2 className="profileInfoDesc">{userEntry}</h2>
              <span className="addOrSend">
                {" "}
                {change ? (
                  <ScheduleSendIcon
                    className="send"
                    titleAccess="in attesa di approvazione"
                    onClick={() => {
                      setChange(false);
                    }}
                  />
                ) : (
                  <PersonAddIcon
                    className="personfriend"
                    titleAccess="invia richiesta di amicizia"
                    onClick={() => {
                      setChange(true);
                      let precedent =
                        JSON.parse(
                          localStorage.getItem("notification" + userEntry) ||
                            "[]"
                        ) || [];
                      let scelta = [...precedent]; // copying the old datas array
                      scelta = [...scelta, userLoggato];

                      localStorage.setItem(
                        "notification" + userEntry,
                        JSON.stringify(scelta) || "[]"
                      );
                    }}
                  />
                )}
              </span>
              <PostUser user={userEntry} />
            </div>
          </div>
          <div className="profileRightBottom"></div>
        </div>
      </div>
    </>
  );
}
