<%@include file="/libs/foundation/global.jsp"%>

<%@page import="com.digitas.nissaneu.sitemap.presenter.SubBlocPresenter"%>
<%@page import="com.digitas.nissaneu.sitemap.utils.PresenterUtils"%>
<%@page import="com.digitas.nissaneu.sitemap.entity.Link"%>
<%
PresenterUtils.makePresenter(SubBlocPresenter.class, slingRequest, properties, currentNode);
String newNode = null;
%>


<cq:includeClientLib categories="cq.widgets"/>
<cq:includeClientLib categories="sitemap.widgets"/>
<h2>${title}</h2>
<!-- Custom component -->
<c:if test="${not empty linkList}">
	<c:forEach var="node" items="${linkList}">
        <c:set var="linkUrl" value="${node.url}" />
        <c:set var="linkLabel" value="${node.title}" />
        <c:set var="linkName" value="${node.name}" />
        <a href="${linkUrl}" alt="${linkLabel}" title="${linkName}">${linkLabel}
			<c:if test="${isEditMode == true}">
                <script>
                CQ.WCM
                .edit({
                    "path" : '${currentNode.path}/${node.name}',
                    "dialog" : "/apps/nissaneu/sitemap/components/content/SubBlocComponent/item",
                    "type" : "nissaneu/sitemap/components/content/SubBlocComponent",
                    "editConfig" : {
                        "xtype" : "editbar",
                        "listeners" : {
                            "afterinsert" : "REFRESH_PAGE",
                            "afteredit" : "REFRESH_PAGE"
                        },
                        "inlineEditing" : CQ.wcm.EditBase.INLINE_MODE_NEVER,
                        "actions" : [
                            CQ.wcm.EditBase.EDITANNOTATE,
                            {
                                "xtype" : "tbseparator"
                            },
                            CQ.wcm.EditBase.DELETE ]
                    }
                });
            	</script>
            </c:if>    
        </a>
        <c:forEach var="childNode" items="${childLinkList}">
            <c:if test="${node.name == childNode.parentName}">
            	<c:set var="linkUrl" value="${childNode.url}" />
                <c:set var="linkLabel" value="${childNode.title}" />
                <c:set var="linkName" value="${childNode.name}" />
                <c:set var="linkParentName" value="${childNode.parentName}" />
                <a href="${linkUrl}" alt="${linkLabel}" title="${linkName}">--${linkLabel}
                    <c:if test="${isEditMode == true}">
                        <script>
                        CQ.WCM
                        .edit({
                            "path" : '${currentNode.path}/${childNode.parentName}/${childNode.name}',
                            "dialog" : "/apps/nissaneu/sitemap/components/content/SubBlocComponent/item",
                            "type" : "nissaneu/sitemap/components/content/SubBlocComponent",
                            "editConfig" : {
                                "xtype" : "editbar",
                                "listeners" : {
                                    "afterinsert" : "REFRESH_PAGE",
                                    "afteredit" : "REFRESH_PAGE"
                                },
                                "inlineEditing" : CQ.wcm.EditBase.INLINE_MODE_NEVER,
                                "actions" : [
                                    CQ.wcm.EditBase.EDITANNOTATE,
                                    {
                                        "xtype" : "tbseparator"
                                    },
                                    CQ.wcm.EditBase.DELETE ]
                            }
                        });
                        </script>
                    </c:if>    
                </a>
            </c:if>
        </c:forEach>
        <c:if test="${isEditMode == true}">
            <c:set var="newNode"
                    value="<%=String.valueOf(System.currentTimeMillis())%>" />
            <p>
                <input type="button" value="Add a SubLink"
                onclick="doOpenDlg('${component.path}/item.infinity.json', '${currentNode.path}/${node.name}/${newNode}');" />
            </p>
    	</c:if><br/>
    </c:forEach>
</c:if>
<c:if test="${isEditMode == true}">
	<c:set var="newNode"
    		value="<%=String.valueOf(System.currentTimeMillis())%>" />
 	<p>
  		<input type="button" value="Add a Link"
   			onclick="doOpenDlg('${component.path}/item.infinity.json', '${currentNode.path}/${newNode}');" />
 	</p>
</c:if>
