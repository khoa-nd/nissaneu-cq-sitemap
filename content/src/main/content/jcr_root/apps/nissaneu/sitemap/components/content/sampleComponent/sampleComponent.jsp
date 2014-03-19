<%@include file="/libs/foundation/global.jsp"%>
<%@page import="com.digitas.nissaneu.sitemap.presenter.SamplePresenter"%>
<%@page import="com.digitas.nissaneu.sitemap.utils.PresenterUtils"%>
<%
PresenterUtils.makePresenter(SamplePresenter.class, slingRequest, properties, currentNode);
%>
<h1>Sample Component</h2>
<p>Title : ${title}</p>
<p>Href : ${href}</p>

