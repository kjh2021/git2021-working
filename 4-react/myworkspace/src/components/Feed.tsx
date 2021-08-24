import React, { useRef, useState } from "react";

 interface FeedState {
   id: number;
   content?: string | undefined;
   dataUrl?: string | undefined;
   Type?: "video/mp4";
   createTime: number;
   modifyTime?: number;
   isEdit?: boolean;
 }

 const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
 };

 const Feed = () => {
   const [feedList, setFeedList] = useState<FeedState[]>([]);

   const textRef = useRef<HTMLTextAreaElement>(null);
   const fileRef = useRef<HTMLInputElement>(null);
   const formRef = useRef<HTMLFormElement>(null);

   const add = () => {
    
     if (fileRef.current?.files?.length) {
       const file = fileRef.current?.files[0];
       const reader = new FileReader();
       const textMemo = textRef.current?.value;
       const datetype = file.type;
       reader.readAsDataURL(file);

       reader.onload = () => {
        const baseCode = reader.result
        console.log(baseCode)
        const date1 : FeedState = {
          id: feedList.length > 0 ? feedList[0].id + 1 : 1,
          createTime: new Date().getTime(),
          content: textMemo,
          dataUrl: baseCode?.toString()
        }
        setFeedList([date1, ...feedList]);
       };
       formRef.current?.reset();
     }
   };
    
   const del = (id: number) => {
     setFeedList(feedList.filter((item) => item.id !== id));
   };

   return (
     <>
     <h2>Feed</h2>
     <form>
       <textarea
        className = "form-control mb-1"
        placeholder = "Leave a post here"
        ref={textRef}
        style = {{ boxSizing: "border-box", height: "100px"}}
        ></textarea>
        <div className="d-flex">
          <input
           type="file"
           className="form-control me-1"
           accept="image/png, image/jpeg, video/mp4"
           aria-describedby="inputGroupFileAddon04"
           aria-label="upload"
           ref={fileRef}
           />
           <button 
            type="button"
            className="btn btn-primary text-nowrap"
            onClick={() => {
             add();
           }}
           >
             입력
           </button>
        </div>
     </form>
     {feedList.map((item) =>
        item.Type === "video/mp4" ? (
          <div key={item.id} className="card">
            <video controls>
              <source src={item.dataUrl} type="video/mp4"></source>
            </video>
            <p className="card-text">{item.content}</p>
            <div className="card-body d-flex">
              <span className="w-100">
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  del(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap"
              >
                삭제
              </a>
            </div>
          </div>
        ) : (
          <div key={item.id} className="card">
            <img src={item.dataUrl} className="card-img-top" alt="…" />
            <p className="card-text">{item.content}</p>
            <div className="card-body d-flex">
              <span className="w-100">
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  del(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap"
              >
                삭제
              </a>
            </div>
          </div>
        )
      )}
        
        
       
   
   </>
   );
 };

 export default Feed;