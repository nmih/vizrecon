import cobra
from ssbio.pipeline.gempro import GEMPRO
from ssbio.core.io import load_pickle
import sys
import logging
from os.path import join
import pandas as pd
import requests
import pickle
import ssbio.protein.sequence.utils.fasta



class create_3Dmodel(self):
    'class to create a 3D visual reconstruction of the model'

    def __init__(self):
        self.models = {}
        self.data_dir = ""


    def load_GEM_Model(self,modeldir,model,model_name):
        """Load the models

        Args:
            model (string): list of model names E.g. ["iAB_RBC_283","RECON1","iAF1260"]
            model_dict(): dictionary of model names corresponding to their actual models for
            example {"iAB_RBC283": <Model iAB_RBC_283 at xxx>...}
            model_name (string): keys of the loaded model in the model_dict
        """
        model_dict={}
        model_loaded={model_name:cobra.io.load_json_model(join(modeldir,model+'.json'))}
        self.models.update(model_loaded)

    def make_GEMPRO_from_GEM(self,modeldir,model,project_name):
        """Make GEM-PRO model based on the user imported model
        """
        GEM_file = modeldir+'/'+model
        GEM_file_type = 'json'
        PDB_file_type = 'mmtf'
        gempro_loaded = {project_name:GEMPRO(gem_name=project_name, root_dir=modeldir, gem_file_path=GEM_file, gem_file_type=GEM_file_type, pdb_file_type=PDB_file_type)}
        self.models.update(gempro_loaded)
        print('Successfully built GEM-PRO model for model:',model)

    def make_GEMPRO_from_Genes(self,modeldir,project_name,gene_list):
        """Make GEM-PRO model based on the user defined gene list
        """

        gempro_loaded = {project_name:GEMPRO(gem_name=project_name, root_dir=modeldir, genes_list=gene_list, pdb_file_type='pdb')}
        self.models.update(gempro_loaded)
        print('Successfully built GEM-PRO model for project:',project_name)

    def make_GEMPRO_from_FASTA(self,fasta_file,project_name):
        """Make GEM-PRO model from FASTA
        """
        ss = ssbio.protein.sequence.utils.fasta.load_fasta_file(fasta_file)

        uniprot_to_bnumber = {}
        for i, r in pd.read_csv('./171205-uniprot_ecoli_mapping_to_bnum_extra1.tab', sep='\t')[['Entry', 'Gene names  (ordered locus )']].iterrows():
            bnum = r['Gene names  (ordered locus )'].split(' ')[0]
            if bnum.startswith('b'):
                uniprot_to_bnumber[r['Entry']] = bnum

        for i, r in pd.read_csv('./171205-uniprot_ecoli_mapping_to_bnum_extra2.tab', sep='\t')[['Entry', 'Gene names  (ordered locus )']].iterrows():
            if r['Entry'] in uniprot_to_bnumber:
                print(r['Entry'])

            bnum = r['Gene names  (ordered locus )'].split(' ')[0]
            if bnum.startswith('b'):
                uniprot_to_bnumber[r['Entry']] = bnum

        for i, r in pd.read_csv('./171205-uniprot_ecoli_mapping_to_bnum_extra3.tab', sep='\t')[['Entry', 'Gene names  (ordered locus )']].iterrows():
            if r['Entry'] in uniprot_to_bnumber:
                print(r['Entry'])

            try:
                bnum = r['Gene names  (ordered locus )'].split(' ')[0]
                if bnum.startswith('b'):
                    uniprot_to_bnumber[r['Entry']] = bnum
            except:
                continue

    def map_Seq_to_Gene(self,model,project_name):
        """Gene to sequence mapping.
        Args:
            model(string):model name stored in models dictionaty
        """


    def map_Struct_to_Seq(self,model,project_name):
        """Seq to structure mapping
        """
        # TODO:

    def rank_Struct(self,model,project_name):
        """Rank the sturcute and download the PDB files
        """
        # TODO:

    def map_Proteomics(self,datadir,project_name):
        """Map the available proteomics to the GEM-PRO model
        """
        # TODO:

    def impt_Complex(self,datadir,filename,project_name):
        """Use proteomics dataset and ME-model simulation results to impute the complex copy number 
        Args:
            datadir(string):data directory to load in the necessary file
            filename(stirng):file names
            project_name(string): key name of the project stored in the self model dict
        """
        # TODO:

    def map_MembProt(self,datadir,filename,project_name):
        """Manipulation and the calculation required for the membrane protein
        """
        #  TODO: