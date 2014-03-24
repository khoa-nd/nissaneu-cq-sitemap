package com.digitas.nissaneu.sitemap.presenter;

import javax.jcr.RepositoryException;

import com.digitas.nissaneu.sitemap.utils.Property;


public class LinkBlocsPresenter extends AbstractPresenter {

	@Override
    protected void process() throws RepositoryException {
		// get title property value setting by dialog
		String title = properties.get(Property.jcrTitle, "Default Title");
		
        putModel("title", title);
    }
	
}
