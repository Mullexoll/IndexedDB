import React, { useState } from "react";
import IndexedDb from "./IndexedDb";
// import users from "../../DB/sample.json";
import { openDB } from "idb";
import { usersAPI } from "../api/api";

const Test = () => {
   const [download, setDownload] = useState<boolean>(true);
   const [date, setDate] = useState<string | number | undefined>();
   const users: string | object[] | number[] | any = [];

   const handleClick = () => {
      usersAPI.getUsers().then((response) => users.push(...response.data));
      console.log(users);
      const downloadDate = new Date().toLocaleTimeString();
      const errorName = "Данное имя базы данных существует";
      const runIndexDb = async () => {
         const dbName = "usersDB";
         const isExisting = (await window.indexedDB.databases())
            .map((db) => db.name)
            .includes(dbName);
         if (isExisting === false) {
            const indexedDb = new IndexedDb(dbName);
            await indexedDb.createObjectStore(["books", "users"]);
            await indexedDb.putValue("users", { name: "Piter Parker" });
            await indexedDb.putBulkValue("users", users);
            await indexedDb.getValue("books", 1);
            await indexedDb.getAllValue("users");
            await indexedDb.deleteValue("books", 1);
            setDownload(false);
         } else {
            console.log(errorName);
         }
         setDownload(false);
         setDate(downloadDate);
      };
      runIndexDb();
   };

   const getAllUsersData = async () => {
      const db = await openDB("usersDB", 1);
      const tx = db.transaction("users", "readonly");
      const store = tx.objectStore("users");
      const result = await store.getAll();
      console.log("Get All Data", JSON.stringify(result));
   };

   return (
      <div>
         {download ? (
            <button onClick={handleClick}>Загрузить данные по API</button>
         ) : (
            <h3>Данные загружены в {date}</h3>
         )}
         <button onClick={getAllUsersData}>Получить все данные из БД</button>
      </div>
   );
};

export default Test;
