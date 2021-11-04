import React from "react";
import IndexedDb from "./IndexedDb";
import users from "../../DB/sample.json";
// import { usersAPI } from "../api/api";

const Test = () => {
   const handleClick = () => {
      // usersAPI.getUsers().then((response) => users.push(...response.data));
      // console.log(users);

      const runIndexDb = async () => {
         const indexedDb = new IndexedDb("usersDB");
         await indexedDb.createObjectStore(["books", "users"]);
         await indexedDb.putValue("users", { name: "Piter Parker" });

         await indexedDb.putBulkValue("users", users);

         await indexedDb.getValue("books", 1);
         await indexedDb.getAllValue("books");
         await indexedDb.deleteValue("books", 1);
      };
      runIndexDb();
   };

   return (
      <div>
         <button onClick={handleClick}>Загрузить данные по API</button>
      </div>
   );
};

export default Test;
