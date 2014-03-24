package com.digitas.nissaneu.sitemap.presenter;

import java.util.ArrayList;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;

import com.digitas.nissaneu.sitemap.entity.Link;
import com.digitas.nissaneu.sitemap.utils.Constant;
import com.digitas.nissaneu.sitemap.utils.Property;


public class SubBlocPresenter extends AbstractPresenter {

	private String title = "";
	ArrayList<Link> linkList = null;
	ArrayList<Link> childLinkList = null;
	NodeIterator nodeList = null;
	@Override
    protected void process() throws RepositoryException {
		
		initParams();
        		
        setLinkListAndChildLinkList();
        
        putToModel();
    }

	private void setLinkListAndChildLinkList() throws RepositoryException,
			ValueFormatException, PathNotFoundException {
		while(nodeList.hasNext())
        {
        	Node node = nodeList.nextNode();
        	if (node.hasProperty(Property.custom)) {
        		String customProperty = node.getProperty(Property.custom).getString();
        		Link linkNode = getLinkNode(customProperty);
        		linkNode.setName(node.getName());
        		//NissanLink link = LinksUtils.getNissanLink(properties.get();
        		linkList.add(linkNode);
        		getChildNodes(node);
        	}
        }
	}

	private void getChildNodes(Node node) throws RepositoryException,
			ValueFormatException, PathNotFoundException {
		if(node.hasNodes()){
			NodeIterator childNodeList = node.getNodes();
			while(childNodeList.hasNext()){
				Node childNode = childNodeList.nextNode();
				if(childNode.hasProperty(Property.custom)){
					String customProperty = childNode.getProperty(Property.custom).getString();
					Link linkNode = getLinkNode(customProperty);
					linkNode.setName(childNode.getName());
					linkNode.setParentName(node.getName());
					childLinkList.add(linkNode);
				}
			}
		}
	}

	private void putToModel() {
		//put to Model
		putModel(Property.title, title);
        putModel(Property.isEditMode, isEditMode);
        putModel(Property.linkList, linkList);
        putModel(Property.childLinkList, childLinkList);
	}

	private void initParams() throws RepositoryException {
		// get title property value setting by dialog
		title = properties.get(Property.jcrTitle, "");
        linkList = new ArrayList<Link>();
        childLinkList = new ArrayList<Link>();
        nodeList = currentNode.getNodes();
	}

	private Link getLinkNode(String customProperty) {
		Link node = new Link();
		try{
			String[] items = customProperty.split(Constant.linkDelimiter);
			node.setUrl(items[1]);
			node.setTitle(items[2]);
		}catch(Exception ex){
		
		}
		return node;
	}
	
}
