package com.digitas.nissaneu.sitemap.utils;

import java.lang.reflect.InvocationTargetException;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.servlet.http.HttpServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;

import com.digitas.nissaneu.sitemap.presenter.AbstractPresenter;

public class PresenterUtils {

	/**
	 * Method to call presenters. Pretty useless since you could call
	 * Presenters's constructor directly in jsp, but it makes it more elegent
	 * like that. A better way would be to resolve the presenter to instanciate
	 * through the component name, but it would require class lookup and some
	 * loading at the application launch, etc...
	 * 
	 * NB : it uses reflection to call constructors, but since there's no lookup
	 * it should be as fast as calling constructor directly.
	 * 
	 * @param clazz
	 * @param request
	 * @param properties
	 */
	public static void makePresenter(Class<? extends AbstractPresenter> clazz, SlingHttpServletRequest request, ValueMap properties, Node currentNode) throws NoSuchMethodException,
			IllegalAccessException, InvocationTargetException, InstantiationException, RepositoryException {
		AbstractPresenter abstractPresenter = clazz.getConstructor().newInstance();
		abstractPresenter.init(request, properties, currentNode);
	}

	public static void makePresenter(Class<? extends AbstractPresenter> clazz, SlingHttpServletRequest request, ValueMap properties, Node currentNode, HttpServletResponse response)
			throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, RepositoryException {
		AbstractPresenter abstractPresenter = clazz.getConstructor().newInstance();
		abstractPresenter.setResponse(response);
		abstractPresenter.init(request, properties, currentNode);
	}
}
