# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: inference_engine.proto
# Protobuf Python Version: 4.25.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x16inference_engine.proto\x12\x10inference_engine\"\x17\n\x07Request\x12\x0c\n\x04text\x18\x01 \x01(\t\"\x18\n\x08Response\x12\x0c\n\x04text\x18\x01 \x01(\t2Z\n\x10InferenceService\x12\x46\n\x0bGetResponse\x12\x19.inference_engine.Request\x1a\x1a.inference_engine.Response\"\x00\x42\x12\xaa\x02\x0fInferenceEngineb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'inference_engine_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\252\002\017InferenceEngine'
  _globals['_REQUEST']._serialized_start=44
  _globals['_REQUEST']._serialized_end=67
  _globals['_RESPONSE']._serialized_start=69
  _globals['_RESPONSE']._serialized_end=93
  _globals['_INFERENCESERVICE']._serialized_start=95
  _globals['_INFERENCESERVICE']._serialized_end=185
# @@protoc_insertion_point(module_scope)
