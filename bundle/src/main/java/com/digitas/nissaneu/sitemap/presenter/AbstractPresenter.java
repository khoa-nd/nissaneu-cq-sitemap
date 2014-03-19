package com.digitas.nissaneu.sitemap.presenter;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMMode;
import com.digitas.nissaneu.sitemap.utils.JcrUtils;

/**
 * Abstract Presenter.
 * 
 * Put your business logic in this class to force separation of concerns, and
 * avoid java code in views (jsp)
 * 
 * all presenters must inherit this class
 * 
 * the method makePresenter. Perhaps we could make a custom servlet to force
 * Presenter calls
 * 
 * @author Kvasseure
 * 
 */
public abstract class AbstractPresenter {

	private final static Logger LOGGER = LoggerFactory.getLogger(AbstractPresenter.class);

	protected SlingHttpServletRequest slingRequest;
	protected HttpServletResponse response;
	protected SlingScriptHelper sling;
	protected Page currentPage;
	protected Node currentNode;
	protected Session session;
	protected ValueMap properties;
	protected boolean isEditMode = false;

	protected void putModel(String name, Object object) {
		slingRequest.setAttribute(name, object);
	}

	public SlingHttpServletRequest getSlingRequest() {
		return slingRequest;
	}

	public SlingScriptHelper getSling() {
		return sling;
	}

	public Page getCurrentPage() {
		return currentPage;
	}

	public Node getCurrentNode() {
		return currentNode;
	}

	public Session getSession() {
		return session;
	}

	public ValueMap getProperties() {
		return properties;
	}
	
	public HttpServletResponse getResponse() {
		return this.response;
	}
	
	public boolean isEditMode() {
		return this.isEditMode;
	}
	
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public void init(SlingHttpServletRequest request, ValueMap properties, Node currentNode) throws RepositoryException {
		this.slingRequest = request;
		this.currentPage = getCurrentPage(request);
		this.session = JcrUtils.getSession(request);
		this.sling = JcrUtils.getSlingScriptHelper(request);
		this.currentNode = currentNode;
		this.properties = properties;
		this.isEditMode = (WCMMode.fromRequest(request) == WCMMode.EDIT);

		// override abstract process method in subclass
		process();
	}
	
	private Page getCurrentPage(SlingHttpServletRequest request) {
		Resource resource = request.getResource();
		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		return pageManager.getContainingPage(resource);
	}

	public String[] getSelectorParam(String selectorName) {
		String selectorString = slingRequest.getRequestPathInfo().getSelectorString();
		if (StringUtils.isNotEmpty(selectorString)) {
			String[] selectors = selectorString.split("\\.");
			for (int i = 0; i < selectors.length; i++) {
				String selector = selectors[i];
				if (selector.startsWith(selectorName)) {
					return selector.split("-");
				}
			}
		}
		return null;
	}
	
	protected abstract void process() throws RepositoryException;
}
