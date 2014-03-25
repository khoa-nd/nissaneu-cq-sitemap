<%@page import="com.digitas.commons.utils.LocaleUtils"%><%
%><%@page import="com.digitas.commons.beans.NissanLink"%><%
%><%@page import="com.digitas.commons.utils.LinksUtils"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.PSConstants"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.PropertyUtils"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.CCMUtils"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.PdsUtils"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.PSUtils"%><%
%><%@page import="com.digitas.nissaneu.newproductsite.utils.PresenterUtils"%><%
%><%@page import="com.day.cq.wcm.commons.WCMUtils" session="false"%><%
%><%@page import="com.day.cq.wcm.api.Page" session="false"%><%
%><%@page import="com.day.cq.wcm.api.components.ComponentContext" session="false"%><%
%><%@page import="com.day.cq.wcm.api.components.EditContext" session="false"%><%
%><%@page import="com.day.cq.wcm.api.WCMMode" session="false"%><%
%><%@page import="java.util.Locale"%><%
%><%@page import="com.digitas.commons.ccm.CCM"%><%
%><%@page import="javax.jcr.Node" session="false"%><%
%><%@page import="javax.jcr.NodeIterator" session="false"%><%
%><%@page import="org.apache.commons.lang3.StringUtils" session="false"%><%
%><%@page import="org.apache.commons.codec.binary.Base64" session="false"%><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %><%
%><%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%
%><%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %><%
%><%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><%
%><%@ page contentType="text/html; charset=utf-8" %><%
%><%@taglib prefix="digitas" uri="http://digitas.com/digitas.taglib" %><%
%><cq:defineObjects /><%

final Locale locale = LocaleUtils.getLocale(slingRequest);
final boolean isEditMode = WCMMode.fromRequest(request) == WCMMode.EDIT;

pageContext.setAttribute("locale", locale);
pageContext.setAttribute("isEditMode", isEditMode);

// Analytics Global Parameters
CCM ccmGlobalAnalytics = sling.getService(CCM.class);
final String CCM_ANALYTICS = "/technical/AnalyticsGlobalParameters";

boolean isResponsive = false;
String[] selectors = slingRequest.getRequestPathInfo().getSelectors();
if (selectors != null && selectors.length > 0) {
 for (String selector : selectors) {
  if(selector.equalsIgnoreCase("responsive")){
   isResponsive = true;
   break;
  }
 }
}

pageContext.setAttribute("isResponsive", isResponsive);

pageContext.setAttribute("trackingAreaIeheader", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.ieheader", null));
pageContext.setAttribute("trackingAreaIefooter", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.iefooter", null));
pageContext.setAttribute("trackingAreaHeader", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.header", null));
pageContext.setAttribute("trackingAreaFooter", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.footer", null));
pageContext.setAttribute("trackingAreaBottom", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.bottom", null));
pageContext.setAttribute("trackingAreaTop", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.top", null));
pageContext.setAttribute("trackingAreaRight", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.right", null));
pageContext.setAttribute("trackingAreaCenter", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.center", null));
pageContext.setAttribute("trackingAreaLeft", ccmGlobalAnalytics.getCCM(CCM_ANALYTICS, "eventdata.buttonzone.left", null));
%>