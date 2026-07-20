import { onRequest as __api_missions_recommended__userId__js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\missions\\recommended\\[userId].js"
import { onRequest as __api_missions_today__userId__js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\missions\\today\\[userId].js"
import { onRequest as __api_missions__missionId__complete_js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\missions\\[missionId]\\complete.js"
import { onRequest as __api_community_feed_js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\community\\feed.js"
import { onRequest as __api_dashboard__userId__js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\dashboard\\[userId].js"
import { onRequest as __api_impact__userId__js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\impact\\[userId].js"
import { onRequestPost as __api_chat_js_onRequestPost } from "D:\\Work_setup\\Ambisprout\\functions\\api\\chat.js"
import { onRequest as __api_blogs_index_js_onRequest } from "D:\\Work_setup\\Ambisprout\\functions\\api\\blogs\\index.js"

export const routes = [
    {
      routePath: "/api/missions/recommended/:userId",
      mountPath: "/api/missions/recommended",
      method: "",
      middlewares: [],
      modules: [__api_missions_recommended__userId__js_onRequest],
    },
  {
      routePath: "/api/missions/today/:userId",
      mountPath: "/api/missions/today",
      method: "",
      middlewares: [],
      modules: [__api_missions_today__userId__js_onRequest],
    },
  {
      routePath: "/api/missions/:missionId/complete",
      mountPath: "/api/missions/:missionId",
      method: "",
      middlewares: [],
      modules: [__api_missions__missionId__complete_js_onRequest],
    },
  {
      routePath: "/api/community/feed",
      mountPath: "/api/community",
      method: "",
      middlewares: [],
      modules: [__api_community_feed_js_onRequest],
    },
  {
      routePath: "/api/dashboard/:userId",
      mountPath: "/api/dashboard",
      method: "",
      middlewares: [],
      modules: [__api_dashboard__userId__js_onRequest],
    },
  {
      routePath: "/api/impact/:userId",
      mountPath: "/api/impact",
      method: "",
      middlewares: [],
      modules: [__api_impact__userId__js_onRequest],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_js_onRequestPost],
    },
  {
      routePath: "/api/blogs",
      mountPath: "/api/blogs",
      method: "",
      middlewares: [],
      modules: [__api_blogs_index_js_onRequest],
    },
  ]