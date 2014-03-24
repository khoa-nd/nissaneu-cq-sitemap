<%@include file="/libs/foundation/global.jsp"%>
<%@page import="com.digitas.nissaneu.sitemap.presenter.LinkBlocsPresenter"%>
<%@page import="com.digitas.nissaneu.sitemap.utils.PresenterUtils"%>
<%
PresenterUtils.makePresenter(LinkBlocsPresenter.class, slingRequest, properties, currentNode);
%>
<h2>${title}</h2>
