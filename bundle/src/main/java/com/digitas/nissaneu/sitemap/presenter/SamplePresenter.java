package com.digitas.nissaneu.sitemap.presenter;

import javax.jcr.RepositoryException;


public class SamplePresenter extends AbstractPresenter {

	@Override
    protected void process() throws RepositoryException {
		// get title property value setting by dialog
		String title = properties.get("jcr:title", "");
		String href = properties.get("href", "");
		
        putModel("title", title);
        putModel("href", href);
    }
	
}
