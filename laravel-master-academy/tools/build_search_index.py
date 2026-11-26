#!/usr/bin/env python3
"""Rebuild data/search-index.json. Run from the project root after adding lessons:  python tools/build_search_index.py"""
import json,os
mods=json.load(open('data/modules.json'))['modules'];items=[]
for m in mods:
    items.append({'k':'module','t':m['title'],'m':'','u':'course.html?m='+m['id'],'q':(m['title']+' '+m['level']).lower()})
    for l in m['lessons']:
        d=json.load(open('data/lessons/%s.json'%l['id']))
        kw=[d['title'],m['title']]+d.get('objectives',[])+[s['heading'] for s in d.get('sections',[])]+[q['q'] for q in d.get('interview',[])]
        items.append({'k':'lesson','t':d['title'],'m':m['title'],'u':'lesson.html?l='+l['id'],'q':' '.join(kw).lower()})
json.dump({'items':items},open('data/search-index.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(items),'entries')
