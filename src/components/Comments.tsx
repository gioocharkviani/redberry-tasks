import { Comment } from "@/types";
import React from "react";
import Button from "./ui/Buttons";

const Comments = ({ data }: { data: Comment[] }) => {
  const commentCount: number = data.length;
  return (
    <div className="flex flex-col">
      <div></div>
      <div className="mt-[63px]">
        {/* CommentTitle */}
        <div className="flex items-center gap-[7px]">
          <h3 className="text-[20px] font-[500]">კომენტარები</h3>
          <div className="rounded-[30px] p-[10px] text-[14px] font-[500] text-white bg-[#8338EC]">
            {commentCount}
          </div>
        </div>
        {/* CommentTitle */}

        <div className="mt-[40px] flex flex-col gap-[38px]">
          {/* oneCommentDesing */}
          <div className="flex gap-[12px]">
            <div className="w-[38px] h-[38px] bg-slate-200 rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[500]">ემილია მორგანი</span>
              <span className="text-[16px] font-[350]">
                დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
              </span>
              <div className="mt-[15px]">
                <Button type="third">უპასუხე</Button>
              </div>
              {/* ReplayBox */}
              <div className="flex gap-[12px] mt-[20px]">
                <div className="w-[38px] h-[38px] bg-slate-200 rounded-full shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-[18px] font-[500]">ემილია მორგანი</span>
                  <span className="text-[16px] font-[350]">
                    დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი
                    იქნება, რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
                  </span>
                </div>
              </div>
              {/* ReplayBox */}
            </div>
          </div>
          {/* oneCommentDesing */}
          {/* oneCommentDesing */}
          <div className="flex gap-[12px]">
            <div className="w-[38px] h-[38px] bg-slate-200 rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[500]">ემილია მორგანი</span>
              <span className="text-[16px] font-[350]">
                დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
              </span>
              <div className="mt-[15px]">
                <Button type="third">უპასუხე</Button>
              </div>
            </div>
          </div>
          {/* oneCommentDesing */}
          {/* oneCommentDesing */}
          <div className="flex gap-[12px]">
            <div className="w-[38px] h-[38px] bg-slate-200 rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[500]">ემილია მორგანი</span>
              <span className="text-[16px] font-[350]">
                დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
              </span>
              <div className="mt-[15px]">
                <Button type="third">უპასუხე</Button>
              </div>
            </div>
          </div>
          {/* oneCommentDesing */}
          {/* oneCommentDesing */}
          <div className="flex gap-[12px]">
            <div className="w-[38px] h-[38px] bg-slate-200 rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[500]">ემილია მორგანი</span>
              <span className="text-[16px] font-[350]">
                დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
              </span>
              <div className="mt-[15px]">
                <Button type="third">უპასუხე</Button>
              </div>
            </div>
          </div>
          {/* oneCommentDesing */}
        </div>
      </div>
    </div>
  );
};

export default Comments;
