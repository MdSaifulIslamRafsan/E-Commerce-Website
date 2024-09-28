
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSession } from "../utils/getSession";

export const middleware = async (request) => {
  const token = cookies(request).get("next-auth.session-token")?.value;
 const pathname = request.nextUrl.pathname;
  const session = await getSession();
  console.log('session' , session)

  if(session){
   if(pathname.startsWith('/dashboard/admin') && session?.role !== 'admin'){
    return NextResponse.redirect(
      new URL(`/not-found`, request.url)
    );
   }
  }else{
    if(pathname.startsWith('/dashboard/admin')){
      return NextResponse.redirect(
        new URL(`/not-found`, request.url)
      );
    }
  }
  
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/products/:path*", "/dashboard/:path*", "/dashboard/admin/:path*"],
};
