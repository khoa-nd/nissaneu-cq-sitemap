package com.digitas.nissaneu.sitemap.utils;

import java.util.Locale;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JcrUtils {
	
	public static final Locale DEFAULT_LOCALE = Locale.UK;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JcrUtils.class);

	public static Session getSession(SlingHttpServletRequest request) {
		return request.getResourceResolver().adaptTo(Session.class);
	}

	public static String convertToRelativePath(String nodePath) {
		if (nodePath.charAt(0) == '/') {
			return nodePath.substring(1, nodePath.length());
		}
		return nodePath;
	}
	
	public static Node getNode(SlingHttpServletRequest request, String nodePath) throws RepositoryException {
		Session session = getSession(request);
		Node root = session.getRootNode();
		nodePath = convertToRelativePath(nodePath);
		if (root.hasNode(nodePath)) {
			return root.getNode(nodePath);
		}
		return null;
	}
   
	public static String getStringValue(Node node, String propertyName) {
		String val = null;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getValue().getString();
			}
		} catch (Exception ex) {
			LOGGER.error("Exception: get string value [" + propertyName + "] error:" + ex.toString(),ex);
		}
		return val;
	}
	
	public static String getStringValue(Node node, String propertyName, String defaultValue) {
		String val = defaultValue;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getValue().getString();
			}
		} catch (Exception ex) {
			LOGGER.error("Exception: get string value [" + propertyName + "] error:" + ex.toString(),ex);
		}
		return val;
	}
	
	public static boolean getBooleanValue(Node node, String propertyName, boolean defaultValue) {
		boolean val = defaultValue;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getValue().getBoolean();
			}
		} catch (Exception ex) {
			LOGGER.error("Exception: get string value [" + propertyName + "] error:" + ex.toString(),ex);
		}
		return val;
	}

	public static SlingScriptHelper getSlingScriptHelper(SlingHttpServletRequest request){
	    SlingBindings bindings = (SlingBindings)request.getAttribute(SlingBindings.class.getName());
	    return bindings.getSling();
	}
	
	public static Value [] getValueList(Node node, String propertyName) {
		Value [] val = null;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getValues();
			}
		} catch (Exception ex) {
			LOGGER.error("Exception: ", ex);
		}
		return val;
	}
}
