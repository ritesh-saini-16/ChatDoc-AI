import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
function Navigation() {
    var route = [
        {
            route: "/",
            name: "Home",
        },
        {
            route: "image",
            name: "Image",
        },
        {
            route: "pdf",
            name: "Pdf",
        },
        {
            route: "excel",
            name: "Excel",
        },
        {
            route: "doc",
            name: "Doc",
        },
    ];
    return (<div className="lg:flex hidden w-full absolute mx-auto top-3  justify-center">
      <Card className="z-50">
        <CardBody className="flex dark:bg-white bg-gray-900 gap-4 flex-row">
          {route === null || route === void 0 ? void 0 : route.map(function (r) {
            return (<>
                <Link href={"/".concat(r.route)}>
                  <span className="dark:text-black text-white">{r.name}</span>
                </Link>
              </>);
        })}
        </CardBody>
      </Card>
    </div>);
}
export default Navigation;
