import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,        
  MdAttachMoney,      
  MdMonetizationOn,   
  MdAccountBalance,   
  MdSecurity,         
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import CreditScore from "views/admin/CreditScore";
import Governance from "views/admin/Governance";
import Assets from "views/admin/Assets";
import Loans from "views/admin/Loans";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} w="20px" h="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Credit Score",
    layout: "/admin",
    path: "/CreditScore",
    icon: <Icon as={MdAttachMoney} w="20px" h="20px" color="inherit" />,
    component: CreditScore,
    secondary: true,
  },
  {
    name: "Loans",
    layout: "/admin",
    icon: <Icon as={MdMonetizationOn} w="20px" h="20px" color="inherit" />,
    path: "/Loans",
    component: Loans,
  },
  {
    name: "Assets",
    layout: "/admin",
    path: "/Assets",
    icon: <Icon as={MdAccountBalance} w="20px" h="20px" color="inherit" />,
    component: Assets,
  },
  {
    name: "Governance",
    layout: "/admin",
    path: "/Governance",
    icon: <Icon as={MdSecurity} w="20px" h="20px" color="inherit" />,
    component: Governance,
  },
];

export default routes;
