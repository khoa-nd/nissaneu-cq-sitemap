<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Collections"%>

<%@ page import="com.digitas.commons.beans.NissanLink"%>
<%@ page import="org.apache.commons.collections.map.MultiValueMap"%>
<%@ page import="com.digitas.nissaneu.newproductsite.beans.NissanLinkPosition"%>

<%@ include file="/apps/nissaneu/sitemap/components/global/global.jsp"%>

<cq:includeClientLib categories="nissaneu.commons.widgets"/>

<div style="text-align:center; border:1px solid #eee;">
	<div class="container">
        <!-- icon -->
        <!-- Custom component -->
		<c:if test="${not empty currentNode}">				
				<%
							Node node = (Node) currentNode;
							boolean displayCustom = PropertyUtils.getBooleanValue(node,	"buildItDisplay");
							NissanLink nissanLink = PropertyUtils.getNissanLink(node, "buildItLink", true);
							String position = PropertyUtils.getStringValue(node, "buildItPosition");
							pageContext.setAttribute("nissanLink", nissanLink);
							if (nissanLink != null) {
								pageContext.setAttribute("nissanLinkString", nissanLink.toString());
							}
							pageContext.setAttribute("displayCustom", displayCustom);
							pageContext.setAttribute("buildItPosition", position);
							if (isEditMode) {
								PropertyUtils.setResourceTypeForImage(node,	"customIcon");
							}
							pageContext.setAttribute("customIcon", nissanLink.getIcon());


				%>

				<c:set var="linkUrl" value="" />
				<c:set var="linkLabel" value="" />
				<c:if test="${not empty nissanLink}">
					<c:set var="linkUrl" value="${nissanLink.link}" />
					<c:set var="linkLabel" value="${nissanLink.label}" />

					<c:if test="${displayCustom == true}">
                        <digitas:link eventValue="eventBrPDF" modelNameLMT="${evar14}"
								trackClick="true" onclick="${nissanLink.onclickValue}"
								nissanlinkfield="${nissanLinkString}" buttonType="customlmt"
								buttonname="${linkLabel}">
                            <img src="${customIcon}" style="width:50px;" />
                            <p>${linkLabel}</p>
                        </digitas:link>
					</c:if> 
				</c:if>			
		</c:if>
    </div>
</div>