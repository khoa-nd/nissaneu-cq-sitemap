package com.digitas.nissaneu.sitemap.presenter;

import javax.jcr.RepositoryException;


public class TitlePresenter extends AbstractPresenter {

	@Override
    protected void process() throws RepositoryException {
		// get title property value setting by dialog
		String title = properties.get("jcr:title", "");
		
        putModel("title", title);
    }
	
}
