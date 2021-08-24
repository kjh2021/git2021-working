import React, { useState } from "react";



 interface FeedState {
   id: number;
   content?: string | undefined;
   dataUrl?: string | undefined;
   fileType?: string | undefined;
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

   const add = {e: React.KeyboardEvent<HTMLInputElement> | null} => {
     if (e) {
       if (e.code !== "Enter") return;
     }

     if (fileRef.current?.files?.length) {
       const file = fileRef.current?.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(file);

       reader.onload = () => {
         post(reader.result?.toString(), file.type);
       };
     } else {
       post(undefined, undefined);
     }
   };
    
   const post = (dataUrl: string | undefined, fileType: string | undefined) => {
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
           ref={textRef}
           />
           <button 
            type="button"
            className="btn btn-primary text-nowrap"
            onClick={() => {
             add(null);
           }}
           >
             입력
           </button>
        </div>
     </form>
     <div className= "mt-3>
     {feedList.map((item) => (
       <div className = "card mt-1" key={item.id}>
         {item.fileType &&
         (item.fileType?.includes("image") ? (
           <img
           src={item.dataUrl}
           className="card-img-top"
           alt={item.content}
           />
         ) : (
           <video class="card-img-top" controls>
             <source src={item.dataUrl} type="video/mp4"></source>
           </video>
         ))}
         <div className="card-body">
           <p className="card-text">{item.content}</p>
           <div className= "d-flex">
           <div className="w-100">
             <span className="text-secondary">
               {getTimeString(
                 item.modifyTime ? item.modifyTime : item.crateTime
               )}
             </span>
           </div>
         </div>
         <a 
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            del(item.id);
          }}
          className="link-secondary fs-6 text-nowrap"
        >
          삭제
        </a>
        </div>
        </div>
   ))}
   </div>
   </>
   );
 };

 export default Feed;